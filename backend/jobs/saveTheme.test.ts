import {
  Colors,
  JobMessage,
  SaveThemePayload,
  Services,
} from '../../types/static'
import createServices from '../services/mock'
import saveTheme from './saveTheme'

function createJob(): JobMessage<SaveThemePayload> {
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
      colors: {
        'activityBar.background': 'color',
        'activityBar.foreground': 'color',
        'statusBar.foreground': 'color',
        'statusBar.background': 'color',
      },
    },
  }
}

test('should not process empty job', async () => {
  const services = createServices()
  jest
    .spyOn(services.saveTheme, 'receive')
    .mockImplementation(() => Promise.resolve(null))

  const fetchSpy = jest.spyOn(services, 'fetch')
  const notifySpy = jest.spyOn(services.saveTheme, 'notify')
  const succeedSpy = jest.spyOn(services.saveTheme, 'succeed')
  await saveTheme(services)
  expect(fetchSpy).toHaveBeenCalledTimes(0)
  expect(succeedSpy).toHaveBeenCalledTimes(0)
})

test('should fail job if it has an invalid payload')

test('should retry job if added to index fails')

test('should succeed job for valid input', async () => {
  const services = createServices()
  jest
    .spyOn(services.saveTheme, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const succeedSpy = jest.spyOn(services.saveTheme, 'succeed')
  await saveTheme(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should not notify self for valid input', async () => {
  const services = createServices()
  jest
    .spyOn(services.saveTheme, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const notifySpy = jest.spyOn(services.saveTheme, 'notify')
  await saveTheme(services)
  expect(notifySpy).toHaveBeenCalledTimes(0)
})
