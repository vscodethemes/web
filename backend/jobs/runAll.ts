import { Services } from '../../types/static'

export default async function run(services: Services): Promise<any> {
  const {
    scrapeThemes,
    extractThemes,
    extractColors,
    saveTheme,
    logger,
  } = services

  logger.log('Notifing scrapeThemes...')
  await scrapeThemes.notify()
  logger.log('Notifing extractThemes...')
  await extractThemes.notify()
  logger.log('Notifing extractColors...')
  await extractColors.notify()
  logger.log('Notifing saveTheme...')
  await saveTheme.notify()
}
