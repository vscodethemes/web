import { Extension, ExtensionQueryResults, Services } from '../../types/static'

export default async function run(services: Services): Promise<any> {
  const { processRepo, logger } = services

  const job = await processRepo.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  logger.log('Proccessing processRepo job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)
  logger.log(`Payload: ${JSON.stringify(job.payload)}`)

  await processRepo.succeed(job)
  await processRepo.notify()
}
