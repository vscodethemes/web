import * as fetch from 'jest-fetch-mock'
import { Extension, Services } from '../../types/static'
import createServices from '../services/mock'
import extractThemes from './extractThemes'

afterEach(() => fetch.resetMocks())

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
