import * as fetch from 'jest-fetch-mock'
import { Extension, Services } from '../../types/static'
import createServices from '../services/mock'
import processRepo from './processRepo'

afterEach(() => fetch.resetMocks())

test('should not process empty job', async () => {
  const services = createServices()
  jest
    .spyOn(services.processRepo, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const fetchSpy = jest.spyOn(services, 'fetch')
  const notifySpy = jest.spyOn(services.processRepo, 'notify')
  const succeedSpy = jest.spyOn(services.processRepo, 'succeed')
  await processRepo(services)
  expect(fetchSpy).toHaveBeenCalledTimes(0)
  expect(succeedSpy).toHaveBeenCalledTimes(0)
})
