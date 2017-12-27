import { Services } from '../../types/static'

export default async function run(services: Services): Promise<any> {
  const { extractThemes, logger } = services

  const job = await extractThemes.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  logger.log('Proccessing extractThemes job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)
  logger.log(`Payload: ${JSON.stringify(job.payload)}`)

  await extractThemes.succeed(job)
  await extractThemes.notify()
}
