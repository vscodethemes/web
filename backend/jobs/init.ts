import { Services } from '@vscodethemes/types'

export default async function run(services: Services): Promise<any> {
  const { scrapeExtensions, logger } = services

  logger.log('Creating scrapeExtensions job for page 1...')
  await scrapeExtensions.create({ page: 1 })
}
