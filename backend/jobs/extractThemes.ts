import templates from '@vscodethemes/templates'
import {
  Colors,
  ColorsRuntime,
  ExtractThemesPayloadRuntime,
  LanguageOptions,
  PackageJSON,
  PackageJSONRuntime,
  Services,
  ThemeType,
} from '@vscodethemes/types'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as stripComments from 'strip-json-comments'
import * as unzip from 'unzip-stream'
import { PermanentJobError, TransientJobError } from '../errors'
import createThemeId from '../utils/createThemeId'
import extractGUIColors from '../utils/extractGUIColors'
import stripTrailingCommas from '../utils/stripTrailingCommas'

export const TMP_DIR = '/tmp/vscodethemes'

export default async function run(services: Services): Promise<any> {
  const { extractThemes, saveTheme, logger } = services

  const job = await extractThemes.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  // Process the next job in the queue.
  await extractThemes.notify()

  logger.log('Processing extractThemes job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)
  logger.log(`Payload: ${JSON.stringify(job.payload)}`)

  let localPackageDir
  try {
    if (!ExtractThemesPayloadRuntime.guard(job.payload)) {
      throw new PermanentJobError('Invalid job payload.')
    }

    const { payload } = job
    const { packageUrl, publisherName, extensionName } = payload

    // Download and extract the extension to the local tmp directory.
    localPackageDir = `${TMP_DIR}/${publisherName}/${extensionName}`
    await downloadExtension(services, packageUrl, localPackageDir)

    // Get all themes in the contributes key of the extension's package.json.
    const packageJson = await getPackageJson(
      `${localPackageDir}/extension/package.json`,
    )
    // For each theme in the contributes key, extract it's gui colors, generate
    // language tokens, and save to Algolia.
    for (const theme of packageJson.contributes.themes) {
      const themeId = createThemeId(publisherName, extensionName, theme.path)

      try {
        const themePath = path.resolve(localPackageDir, 'extension', theme.path)
        const themeDefinition = await readJson(themePath)
        // Fallback to the name field in the theme's json definition if label
        // is not set in package.json.
        const themeName = theme.label || themeDefinition.name
        if (!themeName) {
          throw new Error('Missing theme name.')
        }
        // Set default to light colors if uiTheme is vs-light or vs, otherwise
        // set to dark.
        const themeType =
          theme.uiTheme === 'vs-light' || theme.uiTheme === 'vs'
            ? 'light'
            : 'dark'

        const [colors, languageTokens] = await Promise.all([
          getColors(themeId, themeType, themeDefinition),
          getLanguageTokens(services, themeType, themeDefinition),
        ])

        // Save theme.
        await saveTheme.create({
          ...payload,
          themeId,
          themeType,
          themeName,
          colors,
          languageTokens,
        })
      } catch (err) {
        logger.log(`Invalid theme '${themeId}': ${err.message}`)
      }
    }

    // Job succeeded.
    await extractThemes.succeed(job)
  } catch (err) {
    if (TransientJobError.is(err)) {
      logger.log(err.message)
      await extractThemes.retry(job)
    } else if (PermanentJobError.is(err)) {
      logger.log(err.message)
      await extractThemes.fail(job, err)
    } else {
      logger.log('Unexpected Error.')
      await extractThemes.fail(job, err)
      // Rethrow error for global error handlers.
      throw err
    }
  } finally {
    if (localPackageDir) {
      await cleanupExtension(localPackageDir)
    }
  }
}

async function downloadExtension(
  services: Services,
  url: string,
  localDirectory: string,
) {
  await fs.ensureDir(localDirectory)
  const res = await services.fetch(url)
  if (!res.ok) {
    throw new TransientJobError(
      `Error fetching extension at ${url}: ${res.statusText}`,
    )
  }

  // Download and extract extension.
  await new Promise((resolve, reject) => {
    res.body
      .pipe(unzip.Extract({ path: localDirectory }))
      .on('close', resolve)
      .on('error', (err: Error) => {
        reject(new PermanentJobError(`Error unzipping ${url}: ${err.message}`))
      })
  })
}

async function cleanupExtension(localDirectory: string) {
  try {
    await fs.remove(localDirectory)
  } catch (err) {
    throw new PermanentJobError(
      `Failed to cleanup extension at ${localDirectory}: ${err.message}`,
    )
  }
}

async function getPackageJson(packageJsonPath: string): Promise<PackageJSON> {
  const packageJson = await readJson(packageJsonPath)
  if (!PackageJSONRuntime.guard(packageJson)) {
    throw new PermanentJobError(`Invalid package.json at ${packageJsonPath}.`)
  }
  return packageJson
}

async function getColors(
  themeId: string,
  type: ThemeType,
  themeDefinition: any,
): Promise<Colors> {
  if (themeDefinition.colors && typeof themeDefinition.colors === 'object') {
    const colors = extractGUIColors(type, themeDefinition.colors)
    if (!ColorsRuntime.guard(colors)) {
      throw new PermanentJobError(`Invalid colors for ${themeId}.`)
    }
    return colors
  } else {
    throw new PermanentJobError(`Missing colors for ${themeId}.`)
  }
}

async function readJson(filePath: string) {
  try {
    const buffer = await fs.readFile(filePath)
    const text = stripTrailingCommas(stripComments(buffer.toString()))
    return JSON.parse(text)
  } catch (err) {
    throw new PermanentJobError(`Invalid json at ${filePath}.`)
  }
}

async function getLanguageTokens(
  services: Services,
  themeId: string,
  themeDefinition: any,
) {
  return {
    [LanguageOptions.javascript]: tokenizeTheme(
      services,
      themeId,
      themeDefinition,
      LanguageOptions.javascript,
    ),
    [LanguageOptions.css]: tokenizeTheme(
      services,
      themeId,
      themeDefinition,
      LanguageOptions.css,
    ),
    [LanguageOptions.html]: tokenizeTheme(
      services,
      themeId,
      themeDefinition,
      LanguageOptions.html,
    ),
  }
}

function tokenizeTheme(
  services: Services,
  themeId: string,
  themeDefinition: any,
  language: LanguageOptions,
) {
  const { tokenizer } = services

  let tokens
  try {
    const code = templates[language]
    const tokenize = tokenizer.create(themeDefinition, language)
    tokens = tokenize.text(code)
  } catch (err) {
    throw new PermanentJobError(
      `Failed to tokenize ${language} for ${themeId}: ${err.message}.`,
    )
  }

  return tokens
}
