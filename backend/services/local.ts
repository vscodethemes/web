// tslint:disable no-console
import fetch from 'node-fetch'
import {
  ExtractThemesPayload,
  Job,
  JobMessage,
  ScrapeThemesPayload,
  Services,
} from '../../types/static'

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

export default function createServices(): Services {
  return {
    fetch,
    // TODO: Allow receive mocks to be passed in via CLI.
    scrapeThemes: createJob<ScrapeThemesPayload>('scrapeThemes', {
      receiptHandle: '',
      payload: { page: 1 },
    }),
    extractThemes: createJob<ExtractThemesPayload>('extractThemes', {
      receiptHandle: '',
      payload: {
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
    logger: {
      log: obj => {
        console.log(obj)
      },
      error: error => {
        console.error(error)
      },
    },
  }
}
