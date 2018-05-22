// tslint:disable no-console
import Tokenizer from '@vscodethemes/tokenizer'
import {
  ExtractColorsPayload,
  ExtractThemesPayload,
  Job,
  JobMessage,
  SaveThemePayload,
  ScrapeExtensionsPayload,
  Services,
} from '@vscodethemes/types'
import fetch from 'node-fetch'
import * as themeVariables from '../utils/themeVariables'

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
  return Object.keys(themeVariables.gui).reduce((colors: any, key: string) => {
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
        repository: 'OneDark-Pro',
        repositoryOwner: 'Binaryify',
        installs: 0,
        rating: 0,
        ratingCount: 0,
        trendingDaily: 0,
        trendingWeekly: 0,
        trendingMonthly: 0,
      },
    }),
    extractColors: createJob<ExtractColorsPayload>('extractColors', {
      receiptHandle: '',
      payload: {
        themeType: 'dark',
        extensionId: 'extensionId',
        extensionName: 'extensionName',
        publisherName: 'publisherName',
        lastUpdated: 1,
        publishedDate: 1,
        releaseDate: 1,
        displayName: 'displayName',
        shortDescription: 'shortDescription',
        repository: 'OneDark-Pro',
        repositoryOwner: 'Binaryify',
        themeUrl:
          'https://raw.githubusercontent.com/Binaryify/OneDark-Pro/master/themes/OneDark-Pro.json',
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
        themeId: 'test',
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
        repository: 'OneDark-Pro',
        repositoryOwner: 'Binaryify',
        themeUrl:
          'https://raw.githubusercontent.com/Binaryify/OneDark-Pro/master/themes/OneDark-Pro.json',
        installs: 0,
        rating: 0,
        ratingCount: 0,
        trendingDaily: 0,
        trendingWeekly: 0,
        trendingMonthly: 0,
        colors: createVSCodeGUIColors(),
        languageTokens: {
          javascript: [],
        },
      },
    }),
  }
}
