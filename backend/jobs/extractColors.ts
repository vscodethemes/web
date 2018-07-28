import templates from '@vscodethemes/templates'
import {
  ColorsRuntime,
  ExtractColorsPayloadRuntime,
  LanguageOptions,
  Services,
  ThemeTypeRuntime,
} from '@vscodethemes/types'
import * as stripComments from 'strip-json-comments'
import { PermanentJobError, TransientJobError } from '../errors'
import extractGUIColors from '../utils/extractGUIColors'
import stripTrailingCommas from '../utils/stripTrailingCommas'

export default async function run(services: Services): Promise<any> {
  const { extractColors, saveTheme, logger } = services

  const job = await extractColors.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  // Process the next job in the queue.
  await extractColors.notify()

  logger.log('Processing extractColors job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)
  logger.log(`Payload: ${JSON.stringify(job.payload)}`)

  try {
    if (!ExtractColorsPayloadRuntime.guard(job.payload)) {
      throw new PermanentJobError('Invalid job payload.')
    }

    const { payload } = job
    const { themeId, themeUrl } = payload
    // Fetch the theme's colors from it's repository.
    const themeSource = await fetchTheme(services, themeUrl)
    // The label key in the repo's package.json is used for the display name.
    // If it doesn't exist use the name in the theme json.
    const themeName = payload.themeName || themeSource.name

    // The uiTheme key in the repo's package.json is used for the theme type.
    // If it doesn't exist use the type in the theme json.
    const themeType = payload.themeType || themeSource.type
    if (!ThemeTypeRuntime.guard(themeType)) {
      throw new PermanentJobError(`Invalid type at ${themeId}: ${themeType}`)
    }

    // Extract the VSCode GUI colors used in the theme preview.
    const colors = extractGUIColors(themeType, themeSource.colors)
    if (!ColorsRuntime.guard(colors)) {
      throw new PermanentJobError(
        `Invalid colors at ${themeId}: ${JSON.stringify(colors)}`,
      )
    }

    const theme = {
      ...payload,
      themeName,
      themeType,
      colors,
      languageTokens: {
        [LanguageOptions.javascript]: tokenizeTheme(
          services,
          themeId,
          themeSource,
          LanguageOptions.javascript,
        ),
        [LanguageOptions.css]: tokenizeTheme(
          services,
          themeId,
          themeSource,
          LanguageOptions.css,
        ),
        [LanguageOptions.html]: tokenizeTheme(
          services,
          themeId,
          themeSource,
          LanguageOptions.html,
        ),
      },
    }

    logger.log(`Theme: ${JSON.stringify(theme)}`)

    // Create a job to save the theme.
    await saveTheme.create(theme)

    // Job succeeded.
    await extractColors.succeed(job)
  } catch (err) {
    if (TransientJobError.is(err)) {
      logger.log(err.message)
      await extractColors.retry(job)
    } else if (PermanentJobError.is(err)) {
      logger.log(err.message)
      await extractColors.fail(job, err)
    } else {
      logger.log('Unexpected Error.')
      await extractColors.fail(job, err)
      // Rethrow error for global error handlers.
      throw err
    }
  }
}

interface FetchThemeResponse {
  name?: string
  type?: string
  colors: {}
  tokenColors: any[]
}

async function fetchTheme(
  services: Services,
  themeUrl: string,
): Promise<FetchThemeResponse> {
  const res = await services.fetch(themeUrl, { method: 'GET' })
  if (!res.ok) {
    throw new TransientJobError(
      `Failed to fetch ${themeUrl}: ${res.statusText}.`,
    )
  }

  let theme
  try {
    const text = await res.text()
    const json = stripTrailingCommas(stripComments(text))
    theme = JSON.parse(json)
  } catch (err) {
    throw new PermanentJobError(`Failed to parse ${themeUrl}: ${err.message}.`)
  }

  if (!theme) {
    throw new PermanentJobError(`Failed to parse ${themeUrl}: Invalid theme.`)
  }

  if (!theme.colors) {
    throw new PermanentJobError(`Failed to parse ${themeUrl}: Invalid colors.`)
  }

  if (!theme.tokenColors || !Array.isArray(theme.tokenColors)) {
    throw new PermanentJobError(
      `Failed to parse ${themeUrl}: Invalid tokenColors.`,
    )
  }

  return theme
}

function tokenizeTheme(
  services: Services,
  themeId: string,
  themeSettings: any,
  language: LanguageOptions,
) {
  const { tokenizer } = services

  let tokens
  try {
    const code = templates[language]
    const tokenize = tokenizer.create(themeSettings, language)
    tokens = tokenize.text(code)
  } catch (err) {
    throw new PermanentJobError(
      `Failed to tokenize ${language} for ${themeId}: ${err.message}.`,
    )
  }

  return tokens
}
