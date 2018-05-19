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
import createThemeId from '../utils/createThemeId'
import extractGUIColors from '../utils/extractGUIColors'

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
    const themeUrl = payload.url
    // Fetch the theme's colors from it's repository.
    const themeSource = await fetchTheme(services, themeUrl)

    const themeId = createThemeId(
      payload.repositoryOwner,
      payload.repository,
      themeSource.name,
    )

    // The label key in the repo's package.json is used for the display name.
    // If it doesn't exist use the name in the theme json.
    const themeName = payload.themeName || themeSource.name

    // The uiTheme key in the repo's package.json is used for the theme type.
    // If it doesn't exist use the type in the theme json.
    const themeType = payload.type || themeSource.type
    if (!ThemeTypeRuntime.guard(themeType)) {
      throw new PermanentJobError(`Invalid type at ${themeUrl}: ${themeType}`)
    }

    const colors = extractGUIColors(themeType, themeSource.colors)
    if (!ColorsRuntime.guard(colors)) {
      throw new PermanentJobError(
        `Invalid colors at ${themeUrl}: ${JSON.stringify(colors)}`,
      )
    }

    const jsTokens = tokenizeTheme(
      services,
      themeSource,
      LanguageOptions.javascript,
      themeUrl,
    )

    // const cssTokens = tokenizeTheme(
    //   services,
    //   themeSource,
    //   LanguageOptions.css,
    //   themeUrl,
    // )

    // const htmlTokens = tokenizeTheme(
    //   services,
    //   themeSource,
    //   LanguageOptions.html,
    //   themeUrl,
    // )

    const theme = {
      ...payload,
      themeId,
      themeName,
      type: themeType,
      colors,
      jsTokens,
      // cssTokens,
      // htmlTokens,
    }

    logger.log(`Theme ${themeUrl}: ${JSON.stringify(theme)}`)

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
    theme = JSON.parse(stripComments(await res.text()))
  } catch (err) {
    throw new PermanentJobError(`Failed to parse ${themeUrl}: ${err.message}.`)
  }

  if (!theme) {
    throw new PermanentJobError(`Failed to parse ${themeUrl}: Invalid theme.`)
  }

  // The name in the theme json is used to generate the id.
  if (!theme.name) {
    throw new PermanentJobError(`Failed to parse ${themeUrl}: Missing name.'`)
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
  themeSettings: any,
  language: LanguageOptions,
  themeUrl: string,
) {
  try {
    const code = templates[language]
    const tokenize = services.tokenizer.create(themeSettings, language)
    return tokenize.text(code)
  } catch (err) {
    throw new PermanentJobError(
      `Failed to tokenize ${language} at ${themeUrl} : ${err.message}.`,
    )
  }
}
