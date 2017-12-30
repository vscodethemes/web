import {
  ExtractThemesPayloadRuntime,
  PackageJSONRuntime,
} from '../../types/runtime'
import { ExtractColorsPayload, PackageJSON, Services } from '../../types/static'
import { PermanentJobError, TransientJobError } from '../errors'

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env

export default async function run(services: Services): Promise<any> {
  const { extractThemes, extractColors, logger } = services

  const job = await extractThemes.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  // Process the next job in the queue.
  await extractThemes.notify()

  logger.log('Proccessing extractThemes job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)
  logger.log(`Payload: ${JSON.stringify(job.payload)}`)

  try {
    if (!ExtractThemesPayloadRuntime.guard(job.payload)) {
      throw new PermanentJobError('Invalid job payload.')
    }

    const { payload } = job
    // Find the default branch of the repository.
    const branch = await fetchDefaultBranch(
      services,
      payload.repositoryOwner,
      payload.repository,
    )

    // Get the package.json for the default branch.
    const packageJson = await fetchPackageJson(
      services,
      payload.repositoryOwner,
      payload.repository,
      branch,
    )

    // A package.json definition can contain multiple theme sources.
    const themes: ExtractColorsPayload[] = packageJson.contributes.themes.map(
      theme => ({
        ...payload,
        repositoryBranch: branch,
        repositoryPath: theme.path,
      }),
    )

    // For each theme source, create a job to extract the colors.
    await Promise.all(themes.map(extractColors.create))

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
  }
}

/**
 * Fetch the repository's default branch.
 */
async function fetchDefaultBranch(
  services: Services,
  repositoryOwner: string,
  repository: string,
): Promise<string> {
  let branch = ''
  const { fetch } = services
  const baseUrl = 'https://api.github.com/repos'
  const auth = `client_id=${GITHUB_CLIENT_ID}&client_secret=${
    GITHUB_CLIENT_SECRET
  }`
  const url = `${baseUrl}/${repositoryOwner}/${repository}?${auth}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new TransientJobError(
      `fetchDefaultBranch error: Bad response '${response.statusText}'`,
    )
  }

  try {
    const data = await response.json()
    branch = data.default_branch
  } catch (err) {
    throw new PermanentJobError(
      'fetchDefaultBranch error: Invalid response data',
    )
  }

  if (!branch) {
    throw new PermanentJobError(
      'fetchDefaultBranch error: Invalid default branch',
    )
  }

  return branch
}

/**
 * Fetch the repository's package.json.
 */
async function fetchPackageJson(
  services: Services,
  repositoryOwner: string,
  repository: string,
  branch: string,
): Promise<PackageJSON> {
  let packageJson: PackageJSON
  const { fetch, logger } = services
  const url = `https://raw.githubusercontent.com/${repositoryOwner}/${
    repository
  }/${branch}/package.json`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new TransientJobError(
      `fetchPackageJson error: Bad response '${response.statusText}'`,
    )
  }

  try {
    packageJson = await response.json()
  } catch (err) {
    logger.error(err)
    throw new TransientJobError('fetchPackageJson error: Invalid response data')
  }

  if (!PackageJSONRuntime.guard(packageJson)) {
    throw new PermanentJobError('fetchPackageJson error: Invalid package json')
  }

  return packageJson
}
