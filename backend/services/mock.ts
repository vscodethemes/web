// tslint:disable no-empty
import * as fetch from 'jest-fetch-mock'
import {
  // FetchRepositoryPayload,
  FetchThemesPayload,
  Job,
  Services,
} from '../../types/static'

function createJob<P>(): Job<P> {
  return {
    create: () => Promise.resolve(),
    receive: () => Promise.resolve(JSON.parse('{}')),
    notify: () => Promise.resolve(),
    succeed: () => Promise.resolve(),
    fail: () => Promise.resolve(),
    retry: () => Promise.resolve(),
  }
}

export default function createServices(): Services {
  return {
    fetch,
    fetchThemes: createJob<FetchThemesPayload>(),
    // fetchRepository: createJob<FetchRepositoryPayload>(),
    logger: {
      log: () => {},
      error: () => {},
    },
  }
}
