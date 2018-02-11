import createServices from '../services/mock'
import init from './init'

test('should create scrape themes job for page 1', async () => {
  const services = createServices()
  const createScrapeExtensionsSpy = jest.spyOn(
    services.scrapeExtensions,
    'create',
  )
  await init(services)
  expect(createScrapeExtensionsSpy).toHaveBeenCalledTimes(1)
  expect(createScrapeExtensionsSpy.mock.calls[0][0]).toEqual({ page: 1 })
})
