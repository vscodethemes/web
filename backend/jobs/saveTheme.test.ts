import { JobMessage, SaveThemePayload } from '../../types/static'
import createServices from '../services/mock'
import saveTheme, { createObjectId } from './saveTheme'

function createJob(): JobMessage<SaveThemePayload> {
  return {
    receiptHandle: '',
    payload: {
      extensionId: 'extensionId',
      extensionName: 'extensionName',
      publisherName: 'publisherName',
      lastUpdated: 1,
      publishedDate: 1,
      releaseDate: 1,
      shortDescription: 'shortDescription',
      name: 'name',
      type: 'dark',
      repository: 'repo',
      repositoryOwner: 'owner',
      repositoryBranch: 'master',
      repositoryPath: './themes/theme.json',
      installs: 1,
      rating: 1,
      ratingCount: 1,
      trendingDaily: 1,
      trendingWeekly: 1,
      trendingMonthly: 1,
      colors: {
        activityBarBackground: 'color',
        activityBarForeground: 'color',
        statusBarBackground: 'color',
        statusBarForeground: 'color',
        editorBackground: 'color',
        editorGroupHeaderTabsBackground: 'color',
        editorGroupHeaderTabsBorder: 'color',
        editorLineNumberForeground: 'color',
        tabActiveBackground: 'color',
        tabActiveForeground: 'color',
        tabActiveBorder: 'color',
        tabBorder: 'color',
        tabInactiveBackground: 'color',
        tabInactiveForeground: 'color',
        contrastActiveBorder: 'color',
        contrastBorder: 'color',
      },
      tokens: {
        keywordForeground: 'color',
        keywordFontStyle: 'fontStyle',
        variableForeground: 'color',
        variableFontStyle: 'fontStyle',
        literalForeground: 'color',
        literalFontStyle: 'fontStyle',
        numberForeground: 'color',
        numberFontStyle: 'fontStyle',
        stringForeground: 'color',
        stringFontStyle: 'fontStyle',
        commentForeground: 'color',
        commentFontStyle: 'fontStyle',
        classForeground: 'color',
        classFontStyle: 'fontStyle',
        functionForeground: 'color',
        functionFontStyle: 'fontStyle',
        selectorForeground: 'color',
        selectorFontStyle: 'fontStyle',
        tagForeground: 'color',
        tagFontStyle: 'fontStyle',
        attributeForeground: 'color',
        attributeFontStyle: 'fontStyle',
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
  const succeedSpy = jest.spyOn(services.saveTheme, 'succeed')
  await saveTheme(services)
  expect(fetchSpy).toHaveBeenCalledTimes(0)
  expect(succeedSpy).toHaveBeenCalledTimes(0)
})

test('should fail job if it has an invalid payload', async () => {
  const services = createServices()
  jest
    .spyOn(services.saveTheme, 'receive')
    .mockImplementation(() => Promise.resolve({}))

  const failSpy = jest.spyOn(services.saveTheme, 'fail')
  await saveTheme(services)
  expect(failSpy).toHaveBeenCalledTimes(1)
})

test('should retry job if add to index fails', async () => {
  const services = createServices()
  jest
    .spyOn(services.saveTheme, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  jest.spyOn(services.index, 'addObject').mockImplementation(() => {
    throw new Error()
  })

  const retrySpy = jest.spyOn(services.saveTheme, 'retry')
  await saveTheme(services)
  expect(retrySpy).toHaveBeenCalledTimes(1)
})

test('should succeed job for valid input', async () => {
  const services = createServices()
  jest
    .spyOn(services.saveTheme, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const succeedSpy = jest.spyOn(services.saveTheme, 'succeed')
  await saveTheme(services)
  expect(succeedSpy).toHaveBeenCalledTimes(1)
})

test('should add to index for valid input', async () => {
  const services = createServices()
  const job = createJob()
  jest
    .spyOn(services.saveTheme, 'receive')
    .mockImplementation(() => Promise.resolve(job))

  const addObjectSpy = jest.spyOn(services.index, 'addObject')
  await saveTheme(services)
  expect(addObjectSpy).toHaveBeenCalledTimes(1)
  expect(addObjectSpy.mock.calls[0][0]).toEqual({
    ...job.payload,
    objectID: createObjectId(job.payload),
  })
})

test('should notify self for valid input', async () => {
  const services = createServices()
  jest
    .spyOn(services.saveTheme, 'receive')
    .mockImplementation(() => Promise.resolve(createJob()))

  const notifySpy = jest.spyOn(services.saveTheme, 'notify')
  await saveTheme(services)
  expect(notifySpy).toHaveBeenCalledTimes(1)
})
