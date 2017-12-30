import { Services } from '../../types/static'
import createServices from '../services/mock'
import runAllJobs from './runAllJobs'

test('should notify all jobs', async () => {
  const services = createServices()
  const notifyScrapeThemesSpy = jest.spyOn(services.scrapeThemes, 'notify')
  const notifyExtractThemesSpy = jest.spyOn(services.extractThemes, 'notify')
  const notifyExtractColorsSpy = jest.spyOn(services.extractColors, 'notify')
  const notifySaveThemeSpy = jest.spyOn(services.saveTheme, 'notify')

  await runAllJobs(services)

  expect(notifyScrapeThemesSpy).toHaveBeenCalledTimes(1)
  expect(notifyExtractThemesSpy).toHaveBeenCalledTimes(1)
  expect(notifyExtractColorsSpy).toHaveBeenCalledTimes(1)
  expect(notifySaveThemeSpy).toHaveBeenCalledTimes(1)
})
