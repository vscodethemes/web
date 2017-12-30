import { Services } from '../../types/static'

export default async function run(services: Services): Promise<any> {
  const {
    scrapeThemes,
    extractThemes,
    extractColors,
    saveTheme,
    logger,
  } = services

  logger.log('Notifying scrapeThemes...')
  await scrapeThemes.notify()
  logger.log('Notifying extractThemes...')
  await extractThemes.notify()
  logger.log('Notifying extractColors...')
  await extractColors.notify()
  logger.log('Notifying saveTheme...')
  await saveTheme.notify()
}
