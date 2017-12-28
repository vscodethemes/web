import * as fetch from 'jest-fetch-mock'
import {
  Colors,
  ExtractColorsPayload,
  JobMessage,
  PackageJSON,
  Services,
} from '../../types/static'
import createServices from '../services/mock'
import extractColors from './extractColors'

afterEach(() => fetch.resetMocks())

function createJob(): JobMessage<ExtractColorsPayload> {
  return {
    receiptHandle: '',
    payload: {
      repository: 'repo',
      repositoryOwner: 'owner',
      repositoryBranch: 'master',
      repositoryPath: './themes/theme.json',
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

function createColors(): Colors {
  return {
    'activityBar.background': 'color',
    'activityBar.foreground': 'color',
    'statusBar.foreground': 'color',
    'statusBar.background': 'color',
  }
}

test('should not process empty job', async () => {
  const services = createServices()
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const fetchSpy = jest.spyOn(services, 'fetch')
  const notifySpy = jest.spyOn(services.extractColors, 'notify')
  const succeedSpy = jest.spyOn(services.extractColors, 'succeed')
  await extractColors(services)
  expect(fetchSpy).toHaveBeenCalledTimes(0)
  expect(succeedSpy).toHaveBeenCalledTimes(0)
})

test('should fail job if it has an invalid payload', async () => {
  const services = createServices()
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve({}))

  const failSpy = jest.spyOn(services.extractColors, 'fail')
  await extractColors(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should retry job if fetching the theme returns a bad response', async () => {
  const services = createServices()
  fetch.mockResponseOnce('', { status: 400 })
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const retrySpy = jest.spyOn(services.extractColors, 'retry')
  await extractColors(services)
  expect(retrySpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetching the theme returns invalid response data', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify(null))
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractColors, 'fail')
  await extractColors(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetching the theme returns invalid name', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ name: null, colors: {} }))
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractColors, 'fail')
  await extractColors(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetching the theme returns invalid colors', async () => {
  const services = createServices()
  fetch.mockResponseOnce(JSON.stringify({ name: 'name', colors: {} }))
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractColors, 'fail')
  await extractColors(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should succeed job for valid input', async () => {
  const services = createServices()
  fetch.mockResponseOnce(
    JSON.stringify({ name: 'name', colors: createColors() }),
  )
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const succeedSpy = jest.spyOn(services.extractColors, 'succeed')
  await extractColors(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should notify self for valid input', async () => {
  const services = createServices()
  fetch.mockResponseOnce(
    JSON.stringify({ name: 'name', colors: createColors() }),
  )
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const notifySpy = jest.spyOn(services.extractColors, 'notify')
  await extractColors(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})

test('should create save theme jobs for valid input')
test('should notify save theme jobs for valid input')
