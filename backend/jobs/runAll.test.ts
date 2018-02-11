import createServices from '../services/mock'
import runAll from './runAll'

test('should notify all jobs', async () => {
  const services = createServices()
  const notifyScrapeExtensionsSpy = jest.spyOn(
    services.scrapeExtensions,
    'notify',
  )
  const notifyExtractThemesSpy = jest.spyOn(services.extractThemes, 'notify')
  const notifyExtractColorsSpy = jest.spyOn(services.extractColors, 'notify')
  const notifySaveThemeSpy = jest.spyOn(services.saveTheme, 'notify')

  await runAll(services)

  expect(notifyScrapeExtensionsSpy).toHaveBeenCalledTimes(1)
  expect(notifyExtractThemesSpy).toHaveBeenCalledTimes(1)
  expect(notifyExtractColorsSpy).toHaveBeenCalledTimes(1)
  expect(notifySaveThemeSpy).toHaveBeenCalledTimes(1)
})
