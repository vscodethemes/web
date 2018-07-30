import { Extension } from '@vscodethemes/types'
import * as nock from 'nock'
import createServices from '../services/mock'
import scrapeExtensions, {
  MARKETPLACE_BASE_URL,
  MARKETPLACE_EXTENSION_ENDPOINT,
  GITHUB_PROPERTY_KEY,
  PACKAGE_FILE_KEY,
} from './scrapeExtensions'

const date = new Date()
const mockPostMarketplace = (statusCode: number, body?: any) =>
  nock(MARKETPLACE_BASE_URL)
    .post(MARKETPLACE_EXTENSION_ENDPOINT)
    .reply(statusCode, body)

const createValidThemes = (): Extension[] => {
  const statistics = [
    { statisticName: 'install', value: 1 },
    { statisticName: 'averagerating', value: 1 },
    { statisticName: 'ratingcount', value: 1 },
    { statisticName: 'trendingdaily', value: 1 },
    { statisticName: 'trendingweekly', value: 1 },
    { statisticName: 'trendingmonthly', value: 1 },
  ]
  return [
    {
      extensionName: 'extensionName1',
      extensionId: 'extensionId',
      lastUpdated: date.toISOString(),
      publishedDate: date.toISOString(),
      releaseDate: date.toISOString(),
      displayName: 'displayName',
      shortDescription: 'shortDescription',
      publisher: {
        publisherName: 'publisherName',
      },
      versions: [
        {
          lastUpdated: '2000-01-00T00:00:00.000',
          files: [
            {
              assetType: PACKAGE_FILE_KEY,
              source: 'https://package.vsix',
            },
          ],
          properties: [
            {
              key: GITHUB_PROPERTY_KEY,
              value: 'https://github.com/owner/repo',
            },
          ],
        },
      ],
      statistics,
    },
  ]
}

const createInvalidThemes = (): any[] => {
  return [
    null,
    {},
    {
      extensionName: 'invalid1',
    },
    {
      extensionName: 'invalid2',
      publisher: {
        publisherName: 'test',
      },
    },
    {
      extensionName: 'invalid3',
      publisher: {
        publisherName: 'test',
      },
      versions: [
        {
          lastUpdated: '2000-01-00T00:00:00.000',
          files: [],
          properties: [
            {
              key: GITHUB_PROPERTY_KEY,
              value: 'https://github.com/owner/repo',
            },
          ],
        },
      ],
    },
  ]
}

test('should not process empty job', async () => {
  const services = createServices()
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const fetchSpy = jest.spyOn(services, 'fetch')
  const notifySpy = jest.spyOn(services.scrapeExtensions, 'notify')
  const succeedSpy = jest.spyOn(services.scrapeExtensions, 'succeed')
  await scrapeExtensions(services)
  expect(fetchSpy).toHaveBeenCalledTimes(0)
  expect(notifySpy).toHaveBeenCalledTimes(0)
  expect(succeedSpy).toHaveBeenCalledTimes(0)
})

test('should notify extract themes when no more jobs', async () => {
  const services = createServices()
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const notifySpy = jest.spyOn(services.extractThemes, 'notify')
  await scrapeExtensions(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})

test('should fail job if it has an invalid payload', async () => {
  const services = createServices()
  jest
    .spyOn(services.scrapeExtensions, 'fail')
    .mockImplementation(() => Promise.resolve({}))

  const failSpy = jest.spyOn(services.scrapeExtensions, 'fail')
  await scrapeExtensions(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should retry job if fetch returns bad response', async () => {
  const services = createServices()
  mockPostMarketplace(400)
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const retrySpy = jest.spyOn(services.scrapeExtensions, 'retry')
  await scrapeExtensions(services)
  expect(retrySpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetch returns invalid response data', async () => {
  const services = createServices()
  mockPostMarketplace(200, JSON.stringify({ results: null }))
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const failSpy = jest.spyOn(services.scrapeExtensions, 'fail')
  await scrapeExtensions(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetch returns invalid extensions', async () => {
  const services = createServices()
  mockPostMarketplace(200, JSON.stringify({ results: [{ extensions: null }] }))
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const failSpy = jest.spyOn(services.scrapeExtensions, 'fail')
  await scrapeExtensions(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should not create job for next page when current page is empty', async () => {
  const services = createServices()
  mockPostMarketplace(200, JSON.stringify({ results: [{ extensions: [] }] }))
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.scrapeExtensions, 'create')
  await scrapeExtensions(services)
  expect(createSpy).toHaveBeenCalledTimes(0)
})

test('should not create job for invalid repositories', async () => {
  const themes = createInvalidThemes()
  const services = createServices()
  mockPostMarketplace(
    200,
    JSON.stringify({ results: [{ extensions: themes }] }),
  )
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.extractThemes, 'create')
  await scrapeExtensions(services)
  expect(createSpy).toHaveBeenCalledTimes(0)
})

test('should throw on unexpected error', async () => {
  const services = createServices()
  // Simulate unexpected error by not calling the mock, this causes nock
  // to throw an error when requesting the url.
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const failSpy = jest.spyOn(services.scrapeExtensions, 'fail')
  let error
  try {
    await scrapeExtensions(services)
  } catch {
    error = true
  }

  expect(error).toEqual(true)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should succeed job for valid input', async () => {
  const services = createServices()
  const themes = createValidThemes()
  mockPostMarketplace(
    200,
    JSON.stringify({ results: [{ extensions: themes }] }),
  )
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const succeedSpy = jest.spyOn(services.scrapeExtensions, 'succeed')
  await scrapeExtensions(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should succeed job for empty page', async () => {
  const services = createServices()
  mockPostMarketplace(200, JSON.stringify({ results: [{ extensions: [] }] }))
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const succeedSpy = jest.spyOn(services.scrapeExtensions, 'succeed')
  await scrapeExtensions(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should create job for next page', async () => {
  const services = createServices()
  const themes = createValidThemes()
  mockPostMarketplace(
    200,
    JSON.stringify({ results: [{ extensions: themes }] }),
  )
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.scrapeExtensions, 'create')
  await scrapeExtensions(services)
  expect(createSpy).toHaveBeenCalledWith({ page: 2 })
})

test('should create job for repositories', async () => {
  const services = createServices()
  const themes = createValidThemes()
  mockPostMarketplace(
    200,
    JSON.stringify({ results: [{ extensions: themes }] }),
  )
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.extractThemes, 'create')
  await scrapeExtensions(services)
  expect(createSpy).toHaveBeenCalledTimes(themes.length)
  expect(createSpy.mock.calls[0][0]).toEqual({
    extensionId: 'extensionId',
    extensionName: 'extensionName1',
    publisherName: 'publisherName',
    lastUpdated: +date,
    publishedDate: +date,
    releaseDate: +date,
    displayName: 'displayName',
    shortDescription: 'shortDescription',
    packageUrl: 'https://package.vsix',
    repositoryUrl: 'https://github.com/owner/repo',
    installs: 1,
    rating: 1,
    ratingCount: 1,
    trendingDaily: 1,
    trendingMonthly: 1,
    trendingWeekly: 1,
  })
})

test('should notify self for valid input', async () => {
  const services = createServices()
  const themes = createValidThemes()
  mockPostMarketplace(
    200,
    JSON.stringify({ results: [{ extensions: themes }] }),
  )
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const notifySpy = jest.spyOn(services.scrapeExtensions, 'notify')
  await scrapeExtensions(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})

test('should notify self for empty page', async () => {
  const services = createServices()
  mockPostMarketplace(200, JSON.stringify({ results: [{ extensions: [] }] }))
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const notifySpy = jest.spyOn(services.scrapeExtensions, 'notify')
  await scrapeExtensions(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})

test('should notify self for invalid input', async () => {
  const services = createServices()
  const themes = createInvalidThemes()
  mockPostMarketplace(
    200,
    JSON.stringify({ results: [{ extensions: themes }] }),
  )
  jest
    .spyOn(services.scrapeExtensions, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const notifySpy = jest.spyOn(services.scrapeExtensions, 'notify')
  await scrapeExtensions(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})
