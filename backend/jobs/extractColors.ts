import {
  ColorsRuntime,
  ExtractColorsPayloadRuntime,
  ThemeTypeRuntime,
  TokensRuntime,
} from '../../types/runtime'
import { Colors, Services, ThemeType, Tokens } from '../../types/static'
import { PermanentJobError, TransientJobError } from '../errors'
import * as themeVariables from '../themeVariables'

export default async function run(services: Services): Promise<any> {
  const { extractColors, saveTheme, logger } = services

  const job = await extractColors.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    await saveTheme.notify()
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
    // Fetch the theme's colors from it's repository.
    const theme = await fetchTheme(
      services,
      payload.repositoryOwner,
      payload.repository,
      payload.repositoryBranch,
      payload.repositoryPath,
    )

    logger.log(`Theme: ${JSON.stringify(theme)}`)

    // Create a job to save the theme.
    await saveTheme.create({ ...payload, ...theme })

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

/**
 * Fetch the repository's theme definition.
 */
async function fetchTheme(
  services: Services,
  repositoryOwner: string,
  repository: string,
  repositoryBranch: string,
  repositoryPath: string,
): Promise<{ name: string; type: ThemeType; colors: Colors; tokens: Tokens }> {
  let name: string
  let type: ThemeType
  let colors: Colors
  let tokens: Tokens
  const { fetch, logger } = services
  const baseUrl = 'https://raw.githubusercontent.com'
  const repoUrl = `${baseUrl}/${repositoryOwner}/${repository}`
  const branchUrl = `${repoUrl}/${repositoryBranch}`
  const url = `${branchUrl}/${repositoryPath.replace(/^\.\//, '')}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new TransientJobError(
      `fetchTheme error: Bad response '${response.statusText}'`,
    )
  }

  let data: any
  try {
    logger.log(`Fetching theme...`)
    data = await response.json()
    name = data.name
    type = data.type
    if (data.colors) {
      colors = extractGUIColors(type, data.colors)
    }
    if (data.tokenColors) {
      tokens = extractTokenColors(data.tokenColors)
    }
  } catch (err) {
    logger.error(err)
    throw new PermanentJobError('fetchTheme error: Invalid response data')
  }

  if (!name) {
    throw new PermanentJobError(`fetchTheme error: Missing name.`)
  }

  if (!ThemeTypeRuntime.guard(type)) {
    throw new PermanentJobError(
      `fetchTheme error: Invalid type: ${JSON.stringify(type)}
        Theme: ${JSON.stringify(data)}`,
    )
  }

  if (!ColorsRuntime.guard(colors)) {
    throw new PermanentJobError(
      `fetchTheme error: Invalid colors: ${JSON.stringify(colors)}
        Theme: ${JSON.stringify(data)}`,
    )
  }

  if (!TokensRuntime.guard(tokens)) {
    throw new PermanentJobError(
      `fetchTheme error: Invalid tokens: ${JSON.stringify(tokens)}
        Theme: ${JSON.stringify(data)}`,
    )
  }

  logger.log(`fetchTheme success: ${JSON.stringify(data)}`)

  return { name, type, colors, tokens }
}

function extractGUIColors(type: ThemeType, data: any): Colors {
  const colors: any = {}

  Object.keys(themeVariables.gui).forEach(key => {
    const colorVar = themeVariables.gui[key]
    // Initially set color to the default and override
    // if we find a match.
    colors[key] = colorVar.defaults[type]
    if (data[colorVar.key]) {
      colors[key] = data[colorVar.key]
    }
  })

  return colors as Colors
}

function extractTokenColors(data: any): Tokens {
  const tokens: any = {}

  Object.keys(themeVariables.tokens).forEach(key => {
    const tokenVar = themeVariables.tokens[key]
    // Initially set token styles to the defaults and override
    // if we find a token with a matching scope.
    tokens[`${key}Foreground`] = tokenVar.defaults.foreground
    tokens[`${key}FontStyle`] = tokenVar.defaults.fontStyle
    // Ensure tokenColors is an array
    if (Array.isArray(data)) {
      for (const token of data) {
        // Check if one of the scopes matches anything in tokenColors.
        // The first match wins.
        for (const scope of tokenVar.scope) {
          // Tokens in tokenColors can have multiple scopes defined as an array
          // or a string delimited by ',' or a single scope defined as a string.
          let scopes = []
          if (typeof token.scope === 'string') {
            scopes = token.scope.split(',')
          } else if (Array.isArray(token.scope)) {
            scopes = token.scope
          }

          if (scopes.indexOf(scope) >= 0) {
            // We found a matching token, override the defaults if applicable.
            if (
              token.settings &&
              typeof token.settings === 'object' &&
              token.settings.foreground
            ) {
              tokens[`${key}Foreground`] = token.settings.foreground
              if (token.settings.fontStyle) {
                tokens[`${key}FontStyle`] = token.settings.fontStyle
              }
            }
          }
        }
      }
    }
  })

  return tokens as Tokens
}
