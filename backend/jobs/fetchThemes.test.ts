import * as fetch from 'jest-fetch-mock'
import { Extension, Services } from '../../types/static'
import createServices from '../services/mock'
import fetchThemes, {
  GITHUB_PROPERTY_NAME,
  MAX_PAGES_TO_FETCH,
} from './fetchThemes'

const createValidThemes = (): Extension[] => {
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
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [] }))
  jest
    .spyOn(services.jobs.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const fetchSpy = jest.spyOn(services, 'fetch')
  await fetchThemes(services)
  expect(fetchSpy).toHaveBeenCalledTimes(0)
})

test('should not process job if max pages reached', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [] }))
  jest
    .spyOn(services.jobs.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ page: MAX_PAGES_TO_FETCH + 1 }))

  const fetchSpy = jest.spyOn(services, 'fetch')
  await fetchThemes(services)
  expect(fetchSpy).toHaveBeenCalledTimes(0)
})

test('should fetch page', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.jobs.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ page: 1 }))

  const fetchSpy = jest.spyOn(services, 'fetch')
  await fetchThemes(services)
  expect(fetchSpy).toHaveBeenCalledTimes(1)
})

test('should queue job for next page', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.jobs.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ page: 1 }))

  const queueSpy = jest.spyOn(services.jobs.fetchThemes, 'queue')
  await fetchThemes(services)
  expect(queueSpy).toHaveBeenCalledWith({ page: 2 })
})

test('should not queue job for next page when current page is empty', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [] }] }))
  jest
    .spyOn(services.jobs.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ page: 1 }))

  const queueSpy = jest.spyOn(services.jobs.fetchThemes, 'queue')
  await fetchThemes(services)
  expect(queueSpy).toHaveBeenCalledTimes(0)
})

test('should queue job for repositories', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.jobs.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ page: 1 }))

  const queueSpy = jest.spyOn(services.jobs.fetchRepository, 'queue')
  await fetchThemes(services)
  expect(queueSpy).toHaveBeenCalledTimes(themes.length)
  expect(queueSpy.mock.calls[0][0]).toEqual({ repository: 'repoUrl1' })
  expect(queueSpy.mock.calls[1][0]).toEqual({ repository: 'repoUrl2' })
})

test('should not queue job for invalid repositories', async () => {
  const services = createServices()
  const themes = createInvalidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.jobs.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ page: 1 }))

  const queueSpy = jest.spyOn(services.jobs.fetchRepository, 'queue')
  await fetchThemes(services)
  expect(queueSpy).toHaveBeenCalledTimes(0)
})

test('should notify fetch themes job', async () => {
  const services = createServices()
  const themes = createInvalidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.jobs.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ page: 1 }))

  const notifySpy = jest.spyOn(services.jobs.fetchThemes, 'notify')
  await fetchThemes(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})

test('should notify fetch repository job on last page', async () => {
  const services = createServices()
  const themes = createInvalidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [] }] }))
  jest
    .spyOn(services.jobs.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ page: 1 }))

  const notifySpy = jest.spyOn(services.jobs.fetchRepository, 'notify')
  await fetchThemes(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})

test('should not notify fetch repository job when not on last page', async () => {
  const services = createServices()
  const themes = createInvalidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  jest
    .spyOn(services.jobs.fetchThemes, 'receive')
    .mockImplementation(() => Promise.resolve({ page: 1 }))

  const notifySpy = jest.spyOn(services.jobs.fetchRepository, 'notify')
  await fetchThemes(services)
  expect(notifySpy).toHaveBeenCalledTimes(0)
})
