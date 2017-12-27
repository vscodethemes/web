import * as fetch from 'jest-fetch-mock'
import { Extension, Services } from '../../types/static'
import createServices from '../services/mock'
import fetchThemes, { GITHUB_PROPERTY_NAME } from './fetchThemes'

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
      extensionName: 'valid1',
      publisher: {
        publisherName: 'test',
      },
      versions: [
        {
          lastUpdated: '2000-01-00T00:00:00.000',
          properties: [{ key: GITHUB_PROPERTY_NAME, value: 'repoUrl1' }],
        },
      ],
      statistics,
    },
    {
      extensionName: 'valid2',
      publisher: {
        publisherName: 'test',
      },
      versions: [
        {
          lastUpdated: '2000-01-00T00:00:00.000',
          properties: [{ key: GITHUB_PROPERTY_NAME, value: 'repoUrl2' }],
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
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const fetchSpy = jest.spyOn(services, 'fetch')
  const notifySpy = jest.spyOn(services.fetchThemes, 'notify')
  const succeedSpy = jest.spyOn(services.fetchThemes, 'succeed')
  await fetchThemes(services)
  expect(fetchSpy).toHaveBeenCalledTimes(0)
  expect(notifySpy).toHaveBeenCalledTimes(0)
  expect(succeedSpy).toHaveBeenCalledTimes(0)
})

test('should fail job if it has an invalid payload', async () => {
  const services = createServices()
  jest
    .spyOn(services.fetchThemes, 'fail')
    .mockImplementation(() => Promise.resolve({}))

  const failSpy = jest.spyOn(services.fetchThemes, 'fail')
  await fetchThemes(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should fetch page', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const fetchSpy = jest.spyOn(services, 'fetch')
  await fetchThemes(services)
  expect(fetchSpy).toHaveBeenCalledTimes(1)
})

test('should retry job if fetch returns bad response', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce('', { status: 400 })
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const retrySpy = jest.spyOn(services.fetchThemes, 'retry')
  await fetchThemes(services)
  expect(retrySpy).toHaveBeenCalledTimes(1)
})

test('should retry job if fetch returns invalid response data', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: null }))
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const retrySpy = jest.spyOn(services.fetchThemes, 'retry')
  await fetchThemes(services)
  expect(retrySpy).toHaveBeenCalledTimes(1)
})

test('should succeed job for valid input', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const succeedSpy = jest.spyOn(services.fetchThemes, 'succeed')
  await fetchThemes(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should create job for next page', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.fetchThemes, 'create')
  await fetchThemes(services)
  expect(createSpy).toHaveBeenCalledWith({ page: 2 })
})

test('should not create job for next page when current page is empty', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [] }] }))
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.fetchThemes, 'create')
  await fetchThemes(services)
  expect(createSpy).toHaveBeenCalledTimes(0)
})

test('should succeed job for empty page', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [] }] }))
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const succeedSpy = jest.spyOn(services.fetchThemes, 'succeed')
  await fetchThemes(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should create job for repositories', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.processRepo, 'create')
  await fetchThemes(services)
  expect(createSpy).toHaveBeenCalledTimes(themes.length)
  expect(createSpy.mock.calls[0][0]).toEqual({
    repository: 'repoUrl1',
    installs: 1,
    rating: 1,
    ratingCount: 1,
    trendingDaily: 1,
    trendingMonthly: 1,
    trendingWeekly: 1,
  })
  expect(createSpy.mock.calls[1][0]).toEqual({
    repository: 'repoUrl2',
    installs: 1,
    rating: 1,
    ratingCount: 1,
    trendingDaily: 1,
    trendingMonthly: 1,
    trendingWeekly: 1,
  })
})

test('should notify for each repository', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const notifySpy = jest.spyOn(services.processRepo, 'notify')
  await fetchThemes(services)
  expect(notifySpy).toHaveBeenCalledTimes(themes.length)
})

test('should not create job for invalid repositories', async () => {
  const services = createServices()
  const themes = createInvalidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const createSpy = jest.spyOn(services.processRepo, 'create')
  await fetchThemes(services)
  expect(createSpy).toHaveBeenCalledTimes(0)
})

test('should notify fetch themes job', async () => {
  const services = createServices()
  const themes = createInvalidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const notifySpy = jest.spyOn(services.fetchThemes, 'notify')
  await fetchThemes(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})

test('should throw on unexpected error', async () => {
  const services = createServices()
  // Simulate unexpected error by forcing fetch to reject.
  fetch.mockRejectOnce(new Error())
  jest
    .spyOn(services.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ payload: { page: 1 } }))

  const failSpy = jest.spyOn(services.fetchThemes, 'fail')
  let error
  try {
    await fetchThemes(services)
  } catch {
    error = true
  }

  expect(error).toEqual(true)
  expect(failSpy).toHaveBeenCalledTimes(1)
})
