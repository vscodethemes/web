import * as fetch from 'jest-fetch-mock'
import { Extension } from '../../types/static'
import createServices from '../services/mock'
import scrapeThemes, { GITHUB_PROPERTY_NAME } from './scrapeThemes'

const date = new Date()

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
      shortDescription: 'shortDescription',
      publisher: {
        publisherName: 'test',
      },
      versions: [
        {
          lastUpdated: '2000-01-00T00:00:00.000',
          properties: [
            {
              key: GITHUB_PROPERTY_NAME,
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
          properties: [],
        },
      ],
    },
  ]
}

afterEach(() => fetch.resetMocks())

test('should not process empty job', async () => {
  const services = createServices()
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const fetchSpy = jest.spyOn(services, 'fetch')
  const notifySpy = jest.spyOn(services.scrapeThemes, 'notify')
  const succeedSpy = jest.spyOn(services.scrapeThemes, 'succeed')
  await scrapeThemes(services)
  expect(fetchSpy).toHaveBeenCalledTimes(0)
  expect(notifySpy).toHaveBeenCalledTimes(0)
  expect(succeedSpy).toHaveBeenCalledTimes(0)
})

test('should notify extract themes when no more jobs', async () => {
  const services = createServices()
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const notifySpy = jest.spyOn(services.extractThemes, 'notify')
  await scrapeThemes(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})

test('should fail job if it has an invalid payload', async () => {
  const services = createServices()
  jest
    .spyOn(services.scrapeThemes, 'fail')
    .mockImplementation(() => Promise.resolve({}))

  const failSpy = jest.spyOn(services.scrapeThemes, 'fail')
  await scrapeThemes(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should retry job if fetch returns bad response', async () => {
  const services = createServices()
  fetch.mockResponseOnce('', { status: 400 })
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const retrySpy = jest.spyOn(services.scrapeThemes, 'retry')
  await scrapeThemes(services)
  expect(retrySpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetch returns invalid response data', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ results: null }))
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const failSpy = jest.spyOn(services.scrapeThemes, 'fail')
  await scrapeThemes(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetch returns invalid extensions', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: null }] }))
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const failSpy = jest.spyOn(services.scrapeThemes, 'fail')
  await scrapeThemes(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should not create job for next page when current page is empty', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [] }] }))
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.scrapeThemes, 'create')
  await scrapeThemes(services)
  expect(createSpy).toHaveBeenCalledTimes(0)
})

test('should not create job for invalid repositories', async () => {
  const services = createServices()
  const themes = createInvalidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.extractThemes, 'create')
  await scrapeThemes(services)
  expect(createSpy).toHaveBeenCalledTimes(0)
})

test('should throw on unexpected error', async () => {
  const services = createServices()
  // Simulate unexpected error by forcing fetch to reject.
  fetch.mockRejectOnce(new Error())
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const failSpy = jest.spyOn(services.scrapeThemes, 'fail')
  let error
  try {
    await scrapeThemes(services)
  } catch {
    error = true
  }

  expect(error).toEqual(true)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should succeed job for valid input', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const succeedSpy = jest.spyOn(services.scrapeThemes, 'succeed')
  await scrapeThemes(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should succeed job for empty page', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [] }] }))
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const succeedSpy = jest.spyOn(services.scrapeThemes, 'succeed')
  await scrapeThemes(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should create job for next page', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.scrapeThemes, 'create')
  await scrapeThemes(services)
  expect(createSpy).toHaveBeenCalledWith({ page: 2 })
})

test('should create job for repositories', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.extractThemes, 'create')
  await scrapeThemes(services)
  expect(createSpy).toHaveBeenCalledTimes(themes.length)
  expect(createSpy.mock.calls[0][0]).toEqual({
    extensionId: 'extensionId',
    lastUpdated: +date,
    publishedDate: +date,
    releaseDate: +date,
    shortDescription: 'shortDescription',
    repository: 'repo',
    repositoryOwner: 'owner',
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
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const notifySpy = jest.spyOn(services.scrapeThemes, 'notify')
  await scrapeThemes(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})

test('should notify self for empty page', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [] }] }))
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const notifySpy = jest.spyOn(services.scrapeThemes, 'notify')
  await scrapeThemes(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})

test('should notify self for invalid input', async () => {
  const services = createServices()
  const themes = createInvalidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.scrapeThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const notifySpy = jest.spyOn(services.scrapeThemes, 'notify')
  await scrapeThemes(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})
