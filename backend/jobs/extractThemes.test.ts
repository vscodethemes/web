import {
  ExtractThemesPayload,
  JobMessage,
  PackageJSON,
} from '@vscodethemes/types'
import * as fetch from 'jest-fetch-mock'
import createServices from '../services/mock'
import extractThemes from './extractThemes'

afterEach(() => fetch.resetMocks())

function createJob(): JobMessage<ExtractThemesPayload> {
  return {
    receiptHandle: '',
    payload: {
      extensionId: 'extensionId',
      extensionName: 'extensionName',
      publisherName: 'publisherName',
      lastUpdated: 1,
      publishedDate: 1,
      releaseDate: 1,
      displayName: 'displayName',
      shortDescription: 'shortDescription',
      repository: 'repo',
      repositoryOwner: 'owner',
      installs: 1,
      rating: 1,
      ratingCount: 1,
      trendingDaily: 1,
      trendingWeekly: 1,
      trendingMonthly: 1,
    },
  }
}

function createPackageJson(): PackageJSON {
  return {
    contributes: {
      themes: [
        { label: 'name', uiTheme: 'vs-dark', path: './themes/theme1.json' },
        { label: 'name', uiTheme: 'vs-dark', path: './themes/theme2.json' },
      ],
    },
  }
}

test('should not process empty job', async () => {
  const services = createServices()
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const fetchSpy = jest.spyOn(services, 'fetch')
  const succeedSpy = jest.spyOn(services.extractThemes, 'succeed')
  await extractThemes(services)
  expect(fetchSpy).toHaveBeenCalledTimes(0)
  expect(succeedSpy).toHaveBeenCalledTimes(0)
})

test('should fail job if it has an invalid payload', async () => {
  const services = createServices()
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve({}))

  const failSpy = jest.spyOn(services.extractThemes, 'fail')
  await extractThemes(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should retry job if fetching default branch returns bad response', async () => {
  const services = createServices()
  fetch.mockResponseOnce('', { status: 400 })
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const retrySpy = jest.spyOn(services.extractThemes, 'retry')
  await extractThemes(services)
  expect(retrySpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetching default branch returns invalid response data', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify(null))
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractThemes, 'fail')
  await extractThemes(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetching default branch returns invalid branch', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ default_branch: null }))
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractThemes, 'fail')
  await extractThemes(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should retry job if fetching package json returns bad response', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ default_branch: 'master' }))
  fetch.mockResponseOnce('', { status: 400 })
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const retrySpy = jest.spyOn(services.extractThemes, 'retry')
  await extractThemes(services)
  expect(retrySpy).toHaveBeenCalledTimes(1)
})

test('should retry job if fetching package json returns invalid response data', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ default_branch: 'master' }))
  fetch.mockResponseOnce('', { status: 400 })
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const retrySpy = jest.spyOn(services.extractThemes, 'retry')
  await extractThemes(services)
  expect(retrySpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetching default branch returns invalid package json', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ default_branch: 'master' }))
  fetch.mockResponseOnce(JSON.stringify({ contributes: { themes: null } }))
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractThemes, 'fail')
  await extractThemes(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should succeed job for valid input', async () => {
  const services = createServices()
  const packageJson: PackageJSON = {
    contributes: {
      themes: [
        { label: 'name', uiTheme: 'vs-dark', path: './themes/theme1.json' },
        { label: 'name', uiTheme: 'vs-dark', path: './themes/theme2.json' },
      ],
    },
  }
  fetch.mockResponseOnce(JSON.stringify({ default_branch: 'master' }))
  fetch.mockResponseOnce(JSON.stringify(packageJson))
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const succeedSpy = jest.spyOn(services.extractThemes, 'succeed')
  await extractThemes(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should create extract theme jobs for valid input', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ default_branch: 'master' }))
  fetch.mockResponseOnce(JSON.stringify(createPackageJson()))
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const createSpy = jest.spyOn(services.extractColors, 'create')
  await extractThemes(services)
  expect(createSpy).toHaveBeenCalledTimes(2)
  expect(createSpy.mock.calls[0][0]).toEqual({
    name: 'name',
    type: 'dark',
    extensionId: 'extensionId',
    extensionName: 'extensionName',
    publisherName: 'publisherName',
    lastUpdated: 1,
    publishedDate: 1,
    releaseDate: 1,
    displayName: 'displayName',
    shortDescription: 'shortDescription',
    repository: 'repo',
    repositoryOwner: 'owner',
    repositoryBranch: 'master',
    repositoryPath: 'themes/theme1.json',
    installs: 1,
    rating: 1,
    ratingCount: 1,
    trendingDaily: 1,
    trendingMonthly: 1,
    trendingWeekly: 1,
  })
  expect(createSpy.mock.calls[1][0]).toEqual({
    name: 'name',
    type: 'dark',
    extensionId: 'extensionId',
    extensionName: 'extensionName',
    publisherName: 'publisherName',
    lastUpdated: 1,
    publishedDate: 1,
    releaseDate: 1,
    displayName: 'displayName',
    shortDescription: 'shortDescription',
    repository: 'repo',
    repositoryOwner: 'owner',
    repositoryBranch: 'master',
    repositoryPath: 'themes/theme2.json',
    installs: 1,
    rating: 1,
    ratingCount: 1,
    trendingDaily: 1,
    trendingMonthly: 1,
    trendingWeekly: 1,
  })
})

test('should notify self', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ default_branch: 'master' }))
  fetch.mockResponseOnce(JSON.stringify(createPackageJson()))
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const notifySpy = jest.spyOn(services.extractThemes, 'notify')
  await extractThemes(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})
