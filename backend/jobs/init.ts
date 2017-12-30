import { Services } from '../../types/static'

export default async function run(services: Services): Promise<any> {
  const { scrapeThemes, logger } = services

  logger.log('Creating scrapeThemes job for page 1...')
  await scrapeThemes.create({ page: 1 })
}
