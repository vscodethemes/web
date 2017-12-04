import * as fetch from 'jest-fetch-mock'
import { Extension, Services } from '../../types/static'
import getThemeRepositories, { GITHUB_PROPERTY_NAME, MAX_PAGES_TO_FETCH } from './fetchThemes'

afterEach(() => fetch.resetMocks())

const createServices = () => ({
  fetch,
  logger: { log: jest.fn(), error: jest.fn() },
  jobs: { create: jest.fn(), receive: jest.fn() },
})

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

test('shoud get repositories for themes', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [] }] }))
  const result = await getThemeRepositories(services)
  expect(result).toEqual(['repoUrl1', 'repoUrl2'])
})

test('shoud not return invalid themes', async () => {
  const services = createServices()
  const themes = createInvalidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: themes }] }))
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [] }] }))
  const result = await getThemeRepositories(services)
  expect(result).toEqual([])
})

test('shoud fetch pages until no results found', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [themes[0]] }] }))
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [themes[1]] }] }))
  fetch.mockResponseOnce(JSON.stringify({ results: [{ extensions: [] }] }))
  await getThemeRepositories(services)
})

test('shoud not fetch more than maximum page limit', async () => {
  const services = createServices()
  const themes = createValidThemes()
  fetch.mockResponse(JSON.stringify({ results: [{ extensions: [themes[0]] }] }))
  await getThemeRepositories(services)
  expect(services.fetch.mock.calls.length).toBe(MAX_PAGES_TO_FETCH)
})
