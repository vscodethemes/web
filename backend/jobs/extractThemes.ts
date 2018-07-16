import {
  ExtractColorsPayload,
  ExtractThemesPayloadRuntime,
  PackageJSON,
  PackageJSONRuntime,
  Services,
  ThemeType,
} from '@vscodethemes/types'
import { PermanentJobError, TransientJobError } from '../errors'
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env
import createThemeId from '../utils/createThemeId'

export default async function run(services: Services): Promise<any> {
  const { extractThemes, extractColors, logger } = services

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

  try {
    if (!ExtractThemesPayloadRuntime.guard(job.payload)) {
      throw new PermanentJobError('Invalid job payload.')
    }

    const { payload } = job
    const {
      repositoryOwner,
      repository,
      publisherName,
      extensionName,
    } = payload
    // Find the default branch of the repository.
    const repositoryBranch = await fetchDefaultBranch(
      services,
      repositoryOwner,
      repository,
    )

    // Get the package.json for the default branch.
    const packageJson = await fetchPackageJson(
      services,
      repositoryOwner,
      repository,
      repositoryBranch,
    )

    const themes: ExtractColorsPayload[] = []
    // A package.json definition can contain multiple theme sources.
    packageJson.contributes.themes.forEach((theme: any) => {
      let type
      if (theme.uiTheme === 'vs-dark') {
        type = 'dark'
      } else if (theme.uiTheme === 'vs-light' || theme.uiTheme === 'vs') {
        type = 'light'
      } else {
        logger.log(`Unkown uiTheme: ${theme.uiTheme}, theme: ${theme}`)
      }

      const baseUrl = 'https://raw.githubusercontent.com'
      const repoUrl = `${baseUrl}/${repositoryOwner}/${repository}`
      const branchUrl = `${repoUrl}/${repositoryBranch}`
      // Remove './' from './path'.
      const themePath = theme.path.replace(/^\.\//, '')
      const url = `${branchUrl}/${themePath}`
      const themeId = createThemeId(publisherName, extensionName, themePath)

      themes.push({
        ...payload,
        themeId,
        themeUrl: url,
        themeType: type as ThemeType,
        themeName: theme.label,
      })
    })

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

// Fetch the repository's default branch.
async function fetchDefaultBranch(
  services: Services,
  repositoryOwner: string,
  repository: string,
): Promise<string> {
  let branch = ''
  const { fetch } = services
  const baseUrl = 'https://api.github.com/repos'
  const auth = `client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`
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

// Fetch the repository's package.json.
async function fetchPackageJson(
  services: Services,
  repositoryOwner: string,
  repository: string,
  branch: string,
): Promise<PackageJSON> {
  let packageJson: PackageJSON
  const { fetch, logger } = services
  const url = `https://raw.githubusercontent.com/${repositoryOwner}/${repository}/${branch}/package.json`

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
