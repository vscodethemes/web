import {
  JobMessage,
  LanguageOptions,
  SaveThemePayload,
} from '@vscodethemes/types'
import createServices from '../services/mock'
import saveTheme from './saveTheme'

function createJob(): JobMessage<SaveThemePayload> {
  return {
    receiptHandle: '',
    payload: {
      themeName: 'themeName',
      extensionId: 'extensionId',
      extensionName: 'extensionName',
      publisherName: 'publisherName',
      lastUpdated: 1,
      publishedDate: 1,
      releaseDate: 1,
      displayName: 'displayName',
      shortDescription: 'shortDescription',
      themeId: 'themeId',
      themeType: 'dark',
      themeUrl: 'themes/theme.json',
      repository: 'repo',
      repositoryOwner: 'owner',
      installs: 1,
      rating: 1,
      ratingCount: 1,
      trendingDaily: 1,
      trendingWeekly: 1,
      trendingMonthly: 1,
      colors: {
        // VSCode GUI
        activityBarBackground: 'color',
        activityBarForeground: 'color',
        statusBarBackground: 'color',
        statusBarForeground: 'color',
        editorBackground: 'color',
        editorForeground: 'color',
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
        // Tokens
        commentForeground: 'color',
        commentFontStyle: 'fontStyle',
        punctuationForeground: 'color',
        punctuationFontStyle: 'fontStyle',
        keywordForeground: 'color',
        keywordFontStyle: 'fontStyle',
        classForeground: 'color',
        classFontStyle: 'fontStyle',
        literalForeground: 'color',
        literalFontStyle: 'fontStyle',
        numberForeground: 'color',
        numberFontStyle: 'fontStyle',
        stringForeground: 'color',
        stringFontStyle: 'fontStyle',
        variableForeground: 'color',
        variableFontStyle: 'fontStyle',
        operatorForeground: 'color',
        operatorFontStyle: 'fontStyle',
        functionForeground: 'color',
        functionFontStyle: 'fontStyle',
        functionParamForeground: 'color',
        functionParamFontStyle: 'fontStyle',
        tagForeground: 'color',
        tagFontStyle: 'fontStyle',
        attributeForeground: 'color',
        attributeFontStyle: 'fontStyle',
        attributeValueForeground: 'color',
        attributeValueFontStyle: 'fontStyle',
        propertyForeground: 'color',
        propertyFontStyle: 'fontStyle',
        selectorForeground: 'color',
        selectorFontStyle: 'fontStyle',
      },
      languageTokens: {
        javascript: [],
        html: [],
        css: [],
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

  jest.spyOn(services.index, 'addObjects').mockImplementation(() => {
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

  const { languageTokens, ...theme } = job.payload
  const addObjectSpy = jest.spyOn(services.index, 'addObjects')
  await saveTheme(services)
  expect(addObjectSpy).toHaveBeenCalledTimes(1)
  expect(addObjectSpy.mock.calls[0][0]).toEqual([
    {
      ...theme,
      objectID: `${job.payload.themeId}/${LanguageOptions.javascript}`,
      language: LanguageOptions.javascript,
      tokens: [],
    },
    {
      ...theme,
      objectID: `${job.payload.themeId}/${LanguageOptions.css}`,
      language: LanguageOptions.css,
      tokens: [],
    },
    {
      ...theme,
      objectID: `${job.payload.themeId}/${LanguageOptions.html}`,
      language: LanguageOptions.html,
      tokens: [],
    },
  ])
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
