import { Services } from '@vscodethemes/types'

export default async function run(services: Services): Promise<any> {
  const { scrapeExtensions, extractThemes, saveTheme, logger } = services

  logger.log('Notifying scrapeExtensions...')
  await scrapeExtensions.notify()
  logger.log('Notifying extractThemes...')
  await extractThemes.notify()
  logger.log('Notifying saveTheme...')
  await saveTheme.notify()
}
