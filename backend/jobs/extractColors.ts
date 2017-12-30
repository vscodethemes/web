import { ColorsRuntime, ExtractColorsPayloadRuntime } from '../../types/runtime'
import { Colors, Services } from '../../types/static'
import { PermanentJobError, TransientJobError } from '../errors'

export default async function run(services: Services): Promise<any> {
  const { extractColors, saveTheme, logger } = services

  const job = await extractColors.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  // Process the next job in the queue.
  await extractColors.notify()

  logger.log('Proccessing extractColors job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)
  logger.log(`Payload: ${JSON.stringify(job.payload)}`)

  try {
    if (!ExtractColorsPayloadRuntime.guard(job.payload)) {
      throw new PermanentJobError('Invalid job payload.')
    }

    const { payload } = job
    // Fetch the theme's colors from it's repository.
    const { name, colors } = await fetchTheme(
      services,
      payload.repositoryOwner,
      payload.repository,
      payload.repositoryBranch,
      payload.repositoryPath,
    )

    const theme = { ...payload, name, colors }
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

  try {
    const data = await response.json()
    logger.log(`fetchTheme: ${JSON.stringify(data)}`)

    theme = {
      name: data.name,
      colors: {
        'activityBar.background': data.colors['activityBar.background'],
        'activityBar.foreground': data.colors['activityBar.foreground'],
        'statusBar.background': data.colors['statusBar.background'],
        'statusBar.foreground': data.colors['statusBar.foreground'],
        // TODO: Add required colors for rendering the editor.
      },
    }
  } catch (err) {
    logger.error(err)
    throw new PermanentJobError('fetchTheme error: Invalid response data')
  }

  if (!theme.name) {
    throw new PermanentJobError(
      `fetchTheme error: Invalid name: ${JSON.stringify(theme)}`,
    )
  }

  if (!ColorsRuntime.guard(theme.colors)) {
    throw new PermanentJobError(
      `fetchTheme error: Invalid colors: ${JSON.stringify(theme)}`,
    )
  }

  return theme
}
