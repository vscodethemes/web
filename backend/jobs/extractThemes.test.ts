import * as fetch from 'jest-fetch-mock'
import {
  Extension,
  ExtractThemesPayload,
  JobMessage,
  PackageJSON,
  Services,
} from '../../types/static'
import createServices from '../services/mock'
import extractThemes from './extractThemes'

afterEach(() => fetch.resetMocks())

function createJob(): JobMessage<ExtractThemesPayload> {
  return {
    receiptHandle: '',
    payload: {
      repository: 'repo',
      repositoryOwner: 'owner',
      stats: {
        installs: 1,
        rating: 1,
        ratingCount: 1,
        trendingDaily: 1,
        trendingWeekly: 1,
        trendingMonthly: 1,
      },
    },
  }
}
test('should not process empty job', async () => {
  const services = createServices()
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const fetchSpy = jest.spyOn(services, 'fetch')
  const notifySpy = jest.spyOn(services.extractThemes, 'notify')
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

test('should retry job if fetching default branch returns invalid response data', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify(null))
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const retrySpy = jest.spyOn(services.extractThemes, 'retry')
  await extractThemes(services)
  expect(retrySpy).toHaveBeenCalledTimes(1)
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
  const createSpy = jest.spyOn(services.extractColors, 'create')
  const notifySpy = jest.spyOn(services.extractColors, 'notify')
  await extractThemes(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
  expect(notifySpy).toHaveBeenCalledTimes(2)
  expect(createSpy).toHaveBeenCalledTimes(2)
  expect(createSpy.mock.calls[0][0]).toEqual({
    name: 'name',
    repository: 'repo',
    repositoryOwner: 'owner',
    repositoryPath: './themes/theme1.json',
    stats: {
      installs: 1,
      rating: 1,
      ratingCount: 1,
      trendingDaily: 1,
      trendingMonthly: 1,
      trendingWeekly: 1,
    },
  })
  expect(createSpy.mock.calls[1][0]).toEqual({
    name: 'name',
    repository: 'repo',
    repositoryOwner: 'owner',
    repositoryPath: './themes/theme2.json',
    stats: {
      installs: 1,
      rating: 1,
      ratingCount: 1,
      trendingDaily: 1,
      trendingMonthly: 1,
      trendingWeekly: 1,
    },
  })
})
