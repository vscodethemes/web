// import * as algoliasearch from 'algoliasearch'
import { SaveThemePayloadRuntime } from '../../types/runtime'
import { SaveThemePayload, Services } from '../../types/static'
import { PermanentJobError, TransientJobError } from '../errors'

export function createObjectId(theme: SaveThemePayload) {
  return `${theme.repositoryOwner}|${theme.repository}|${theme.repositoryPath}`
}

export default async function run(services: Services): Promise<any> {
  const { saveTheme, logger } = services

  const job = await saveTheme.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  logger.log('Proccessing saveTheme job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)
  logger.log(`Payload: ${JSON.stringify(job.payload)}`)

  try {
    if (!SaveThemePayloadRuntime.guard(job.payload)) {
      throw new PermanentJobError('Invalid job payload.')
    }

    const { payload } = job
    // Save the theme to Algolia search.
    await addToSearch(services, payload)
    // Job succeeded.
    await saveTheme.succeed(job)
  } catch (err) {
    if (TransientJobError.is(err)) {
      logger.log(err.message)
      await saveTheme.retry(job)
    } else if (PermanentJobError.is(err)) {
      logger.log(err.message)
      await saveTheme.fail(job, err)
    } else {
      logger.log('Unexpected Error.')
      await saveTheme.fail(job, err)
      // Rethrow error for global error handlers.
      throw err
    }
  }
}

/**
 * Add theme to Algolia index.
 */
async function addToSearch(
  services: Services,
  theme: SaveThemePayload,
): Promise<string> {
  const { index } = services
  const objectID = createObjectId(theme)
  // Save to algolia index.
  try {
    await index.addObject({ ...theme, objectID })
    return objectID
  } catch (err) {
    throw new TransientJobError(err.message)
  }
}
