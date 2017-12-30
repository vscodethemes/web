import { Services } from '../../types/static'
import createServices from '../services/mock'
import init from './init'

test('should create scrape themes job for page 1', async () => {
  const services = createServices()
  const createScrapeThemesSpy = jest.spyOn(services.scrapeThemes, 'create')
  await init(services)
  expect(createScrapeThemesSpy).toHaveBeenCalledTimes(1)
  expect(createScrapeThemesSpy.mock.calls[0][0]).toEqual({ page: 1 })
})
