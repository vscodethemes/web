import {
  ExtractColorsPayload,
  JobMessage,
  SaveThemePayloadRuntime,
} from '@vscodethemes/types'
import * as fetch from 'jest-fetch-mock'
import createServices from '../services/mock'
import * as themeVariables from '../utils/themeVariables'
import createThemeId from '../utils/createThemeId'
import extractColors from './extractColors'

afterEach(() => fetch.resetMocks())

function createJob(): JobMessage<ExtractColorsPayload> {
  return {
    receiptHandle: '',
    payload: {
      themeId: 'themeId',
      themeName: 'themeName',
      themeType: 'dark',
      themeUrl: 'themes/theme.json',
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

// Creates a valid colors payload.
function createColors(removeOptional: boolean): any {
  const payloadColors: any = {}

  Object.keys(themeVariables.gui).forEach(key => {
    const colorVar = themeVariables.gui[key]
    payloadColors[colorVar.key] = 'color'
  })

  if (removeOptional) {
    delete payloadColors.editorGroupHeaderTabsBorder
    delete payloadColors.tabActiveBorder
    delete payloadColors.tabBorder
    delete payloadColors.contrastActiveBorder
    delete payloadColors.contrastBorder
  }

  return payloadColors
}

test('should not process empty job', async () => {
  const services = createServices()
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const fetchSpy = jest.spyOn(services, 'fetch')
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

test('should fail job if fetching the theme returns missing name', async () => {
  const services = createServices()
  const job = createJob()
  delete job.payload.themeName
  fetch.mockResponseOnce(
    JSON.stringify({
      name: null,
      type: 'dark',
      colors: createColors(false),
    }),
  )
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(job))

  const failSpy = jest.spyOn(services.extractColors, 'fail')
  await extractColors(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetching the theme returns invalid type', async () => {
  const services = createServices()
  fetch.mockResponseOnce(
    JSON.stringify({
      name: null,
      type: 'invalid',
      colors: createColors(false),
    }),
  )
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractColors, 'fail')
  await extractColors(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetching the theme returns missing colors', async () => {
  const services = createServices()
  fetch.mockResponseOnce(
    JSON.stringify({
      name: 'name',
      type: 'dark',
      colors: null,
    }),
  )
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractColors, 'fail')
  await extractColors(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetching the theme returns missing tokenColors', async () => {
  const services = createServices()
  fetch.mockResponseOnce(
    JSON.stringify({
      name: 'name',
      type: 'dark',
      colors: createColors(false),
      tokenColors: null,
    }),
  )
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractColors, 'fail')
  await extractColors(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should fail job if fetching the theme returns textmate tokenColors', async () => {
  const services = createServices()
  fetch.mockResponseOnce(
    JSON.stringify({
      name: 'name',
      type: 'dark',
      colors: createColors(false),
      tokenColors: './tmTheme',
    }),
  )
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractColors, 'fail')
  await extractColors(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should succeed job for valid input with all fields', async () => {
  const services = createServices()
  fetch.mockResponseOnce(
    JSON.stringify({
      name: 'name',
      type: 'dark',
      colors: createColors(false),
      tokenColors: [],
    }),
  )
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const succeedSpy = jest.spyOn(services.extractColors, 'succeed')
  await extractColors(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should succeed job for valid input without optional fields', async () => {
  const services = createServices()
  fetch.mockResponseOnce(
    JSON.stringify({
      name: 'name',
      type: 'dark',
      colors: createColors(true),
      tokenColors: [],
    }),
  )
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const succeedSpy = jest.spyOn(services.extractColors, 'succeed')
  await extractColors(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should notify self', async () => {
  const services = createServices()
  fetch.mockResponseOnce(
    JSON.stringify({
      name: 'name',
      type: 'dark',
      colors: createColors(false),
      tokenColors: [],
    }),
  )
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const notifySpy = jest.spyOn(services.extractColors, 'notify')
  await extractColors(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})

test('should create save theme job for valid input', async () => {
  const services = createServices()
  fetch.mockResponseOnce(
    JSON.stringify({
      name: 'Theme Name',
      type: 'dark',
      colors: createColors(false),
      tokenColors: [],
    }),
  )
  jest
    .spyOn(services.extractColors, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const createSpy = jest.spyOn(services.saveTheme, 'create')
  await extractColors(services)
  expect(createSpy).toHaveBeenCalledTimes(1)
  const payload = createSpy.mock.calls[0][0]
  expect(SaveThemePayloadRuntime.guard(payload)).toEqual(true)
})
