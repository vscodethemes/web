import { ColorsRuntime, ExtractColorsPayloadRuntime } from '../../types/runtime'
import {
  Colors,
  // SaveThemePayload,
  Services,
} from '../../types/static'
import { PermanentJobError, TransientJobError } from '../errors'

export default async function run(services: Services): Promise<any> {
  const { extractColors, logger } = services

  const job = await extractColors.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  logger.log('Proccessing extractColors job...')
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

    logger.log(theme)

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
): Promise<{ name: string; colors: Colors }> {
  let theme
  const { fetch } = services
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

  try {
    const { name, colors } = await response.json()
    theme = {
      name,
      colors: {
        'activityBar.background': colors['activityBar.background'],
        'activityBar.foreground': colors['activityBar.foreground'],
        // TODO: Add required colors for rendering the editor.
      },
    }
  } catch (err) {
    throw new TransientJobError('fetchTheme error: Invalid response data')
  }
  if (!theme.name) {
    throw new PermanentJobError('fetchTheme error: Invalid name')
  }

  if (!ColorsRuntime.guard(theme.colors)) {
    throw new PermanentJobError('fetchTheme error: Invalid colors')
  }

  return theme
}
