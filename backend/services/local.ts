// tslint:disable no-console
import themeVariables from '@vscodethemes/theme-variables'
import Tokenizer from '@vscodethemes/tokenizer'
import {
  ExtractThemesPayload,
  Job,
  JobMessage,
  SaveThemePayload,
  ScrapeExtensionsPayload,
  Services,
} from '@vscodethemes/types'
import fetch from 'node-fetch'

function createJob<P>(name: string, receiveMock: JobMessage<P>): Job<P> {
  return {
    create: async payload => {
      console.log('Job created:', name, payload)
      return {}
    },
    receive: async (): Promise<JobMessage<P>> => {
      console.log('Job received:', name)
      return receiveMock
    },
    notify: async () => {
      console.log('Notify job:', name)
    },
    succeed: async message => {
      console.log('Job succeeded:', name)
      return {}
    },
    fail: async message => {
      console.log('Job failed:', name, message)
      return {}
    },
    retry: async message => {
      console.log('Retrying job:', name)
      return {}
    },
  }
}

function createVSCodeGUIColors(): any {
  return Object.keys(themeVariables).reduce((colors: any, key: string) => {
    colors[key] = 'color'
    return colors
  }, {})
}

export default function createServices(): Services {
  return {
    fetch,
    logger: {
      log: obj => {
        console.log(obj)
      },
      error: error => {
        console.error(error)
      },
    },
    reportError: async error => console.error(error),
    index: {
      addObjects: objects => {
        console.log('Added objects to index', objects)
        return Promise.resolve()
      },
    },
    tokenizer: {
      create: (theme, language) => {
        const tokenizer = new Tokenizer(theme, language)
        return {
          line: line => tokenizer.tokenizeLine(line),
          text: text => tokenizer.tokenizeText(text),
        }
      },
    },
    // TODO: Allow receive mocks to be passed in via CLI.
    scrapeExtensions: createJob<ScrapeExtensionsPayload>('scrapeExtensions', {
      receiptHandle: '',
      payload: { page: 1 },
    }),
    extractThemes: createJob<ExtractThemesPayload>('extractThemes', {
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
        repositoryUrl: 'https://github.com/Binaryify/OneDark-Pro',
        packageUrl:
          'https://zhuangtongfa.gallerycdn.vsassets.io/extensions/zhuangtongfa/material-theme/2.15.1/1530771490844/Microsoft.VisualStudio.Services.VSIXPackage',
        installs: 0,
        rating: 0,
        ratingCount: 0,
        trendingDaily: 0,
        trendingWeekly: 0,
        trendingMonthly: 0,
      },
    }),
    saveTheme: createJob<SaveThemePayload>('saveTheme', {
      receiptHandle: '',
      payload: {
        themeId: 'themeId',
        extensionId: 'extensionId',
        extensionName: 'extensionName',
        publisherName: 'publisherName',
        lastUpdated: 1,
        publishedDate: 1,
        releaseDate: 1,
        displayName: 'displayName',
        shortDescription: 'shortDescription',
        themeName: 'One Dark',
        themeType: 'dark',
        repositoryUrl: 'https://github.com/Binaryify/OneDark-Pro',
        packageUrl:
          'https://zhuangtongfa.gallerycdn.vsassets.io/extensions/zhuangtongfa/material-theme/2.15.1/1530771490844/Microsoft.VisualStudio.Services.VSIXPackage',
        installs: 0,
        rating: 0,
        ratingCount: 0,
        trendingDaily: 0,
        trendingWeekly: 0,
        trendingMonthly: 0,
        colors: createVSCodeGUIColors(),
        languageTokens: {
          javascript: [],
          css: [],
          html: [],
        },
      },
    }),
  }
}
