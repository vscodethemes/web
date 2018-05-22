import { SaveThemePayloadRuntime, Services, Theme } from '@vscodethemes/types'
import { PermanentJobError, TransientJobError } from '../errors'

export default async function run(services: Services): Promise<any> {
  const { saveTheme, logger } = services

  const job = await saveTheme.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  // Process the next job in the queue.
  await saveTheme.notify()

  logger.log('Processing saveTheme job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)
  logger.log(`Payload: ${JSON.stringify(job.payload)}`)

  try {
    if (!SaveThemePayloadRuntime.guard(job.payload)) {
      throw new PermanentJobError('Invalid job payload.')
    }

    const { payload } = job

    // Save the theme to Algolia search.
    const { languageTokens, ...theme } = payload
    const themes = [
      {
        ...theme,
        objectID: theme.themeId,
        language: 'javascript',
        tokens: languageTokens.javascript,
      },
    ]
    await addToSearch(services, themes, payload.themeId)
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

// Add theme to Algolia index.
async function addToSearch(
  services: Services,
  themes: Theme[],
  objectID: string,
): Promise<string> {
  const { index } = services
  try {
    await index.addObjects(themes)
    return objectID
  } catch (err) {
    throw new TransientJobError(err.message)
  }
}
