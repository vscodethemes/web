// tslint:disable no-console
import fetch from 'node-fetch'
import {
  ExtractColorsPayload,
  ExtractThemesPayload,
  Job,
  JobMessage,
  SaveThemePayload,
  ScrapeExtensionsPayload,
  Services,
} from '../../types/static'
import * as themeVariables from '../themeVariables'

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
      console.log('Job succeeded:', name, message)
      return {}
    },
    fail: async message => {
      console.log('Job failed:', name, message)
      return {}
    },
    retry: async message => {
      console.log('Retrying job:', name, message)
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

function createTokenColors(): any {
  return Object.keys(themeVariables.tokens).reduce(
    (tokens: any, key: string) => {
      tokens[`${key}Foreground`] = 'color'
      tokens[`${key}FontStyle`] = 'fontStyle'
      return tokens
    },
    {},
  )
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
    index: {
      addObject: obj => {
        console.log('Added object to index', obj)
        return Promise.resolve()
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
        extensionId: 'extensionId',
        extensionName: 'extensionName',
        publisherName: 'publisherName',
        lastUpdated: 1,
        publishedDate: 1,
        releaseDate: 1,
        shortDescription: 'shortDescription',
        repository: 'OneDark-Pro',
        repositoryOwner: 'Binaryify',
        repositoryPath: './themes/OneDark-Pro.json',
        repositoryBranch: 'master',
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
        extensionId: 'extensionId',
        extensionName: 'extensionName',
        publisherName: 'publisherName',
        lastUpdated: 1,
        publishedDate: 1,
        releaseDate: 1,
        shortDescription: 'shortDescription',
        name: 'One Dark',
        type: 'dark',
        repository: 'OneDark-Pro',
        repositoryOwner: 'Binaryify',
        repositoryPath: './themes/OneDark-Pro.json',
        repositoryBranch: 'master',
        installs: 0,
        rating: 0,
        ratingCount: 0,
        trendingDaily: 0,
        trendingWeekly: 0,
        trendingMonthly: 0,
        colors: {
          ...createVSCodeGUIColors(),
          ...createTokenColors(),
        },
      },
    }),
  }
}
