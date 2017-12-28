import { ColorsRuntime, ExtractColorsPayloadRuntime } from '../../types/runtime'
import { Colors, PackageJSON, Services } from '../../types/static'
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

    // Fetch the theme's colors from it's repository.
    const { payload } = job
    const theme = await fetchTheme(
      services,
      payload.repositoryOwner,
      payload.repository,
      payload.repositoryBranch,
      payload.repositoryPath,
    )

    console.log(theme)

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
): Promise<{}> {
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
    const data = await response.json()
    theme = {
      name: data.name,
      colors: {},
    }
  } catch (err) {
    throw new TransientJobError('fetchTheme error: Invalid response data')
  }

  // if (!SavePayloadRuntime.guard(theme)) {
  //   throw new PermanentJobError('fetchTheme error: Invalid colors')
  // }

  return theme
}
