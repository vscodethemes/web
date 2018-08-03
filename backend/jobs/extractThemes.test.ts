import {
  ExtractThemesPayload,
  JobMessage,
  PackageJSON,
} from '@vscodethemes/types'
import * as fs from 'fs-extra'
import * as nock from 'nock'
import * as path from 'path'
import * as Stream from 'stream'
import createServices from '../services/mock'
import extractThemes, { TMP_DIR } from './extractThemes'

const extensionName = 'test-extensionName'
const publisherName = 'test-publisherName'
const localPackagePath = `${TMP_DIR}/${publisherName}/${extensionName}`
const packageUrl = 'https://package.zip'
const mockGetPackage = (statusCode: number, body?: any) =>
  nock(packageUrl)
    .get('/')
    .reply(statusCode, body)

afterEach(async () => {
  await fs.remove(TMP_DIR)
})

function createJob(): JobMessage<ExtractThemesPayload> {
  return {
    receiptHandle: '',
    payload: {
      extensionId: 'extensionId',
      extensionName,
      publisherName,
      lastUpdated: 1,
      publishedDate: 1,
      releaseDate: 1,
      displayName: 'displayName',
      shortDescription: 'shortDescription',
      packageUrl,
      installs: 1,
      rating: 1,
      ratingCount: 1,
      trendingDaily: 1,
      trendingWeekly: 1,
      trendingMonthly: 1,
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

test('should retry job if downloading extension returns bad response', async () => {
  mockGetPackage(400)
  const services = createServices()
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const retrySpy = jest.spyOn(services.extractThemes, 'retry')
  await extractThemes(services)
  expect(retrySpy).toHaveBeenCalledTimes(1)
})

test('should fail job if downloading extension returns invalid package', async () => {
  mockGetPackage(200, new Stream())
  const services = createServices()
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractThemes, 'fail')
  await extractThemes(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should fail job for extension with invalid package json', async () => {
  const invalidPackagePath = path.resolve(
    __dirname,
    'mocks/invalid-package-json.zip',
  )
  mockGetPackage(200, fs.createReadStream(invalidPackagePath))
  const services = createServices()
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const failSpy = jest.spyOn(services.extractThemes, 'fail')
  await extractThemes(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
  expect(fs.existsSync(localPackagePath)).toEqual(false)
})

test('should skip theme for extension with missing name', async () => {
  const invalidPackagePath = path.resolve(__dirname, 'mocks/missing-name.zip')
  mockGetPackage(200, fs.createReadStream(invalidPackagePath))
  const services = createServices()
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const succeedSpy = jest.spyOn(services.extractThemes, 'succeed')
  const saveSpy = jest.spyOn(services.saveTheme, 'create')
  await extractThemes(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
  expect(saveSpy).toHaveBeenCalledTimes(0)
  expect(fs.existsSync(localPackagePath)).toEqual(false)
})

test('should save theme for valid package', async () => {
  const validPackagePath = path.resolve(
    __dirname,
    'mocks/zhuangtongfa.Material-theme.zip',
  )
  mockGetPackage(200, fs.createReadStream(validPackagePath))
  const services = createServices()
  jest
    .spyOn(services.extractThemes, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const succeedSpy = jest.spyOn(services.extractThemes, 'succeed')
  const saveSpy = jest.spyOn(services.saveTheme, 'create')
  const notifySpy = jest.spyOn(services.extractThemes, 'notify')
  await extractThemes(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
  expect(saveSpy).toHaveBeenCalledTimes(2)
  expect(notifySpy).toHaveBeenCalledTimes(1)
  expect(fs.existsSync(localPackagePath)).toEqual(false)
})
