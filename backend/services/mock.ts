// tslint:disable no-empty
import * as fetch from 'jest-fetch-mock'
import {
  Fetch,
  FetchRepositoryPayload,
  FetchThemesPayload,
  Job,
  Services,
} from '../../types/static'

function createJob<P>(): Job<P> {
  return {
    queue: () => Promise.resolve(),
    receive: () => Promise.resolve(JSON.parse('{}')),
    notify: () => Promise.resolve(),
  }
}

export default function createServices(): Services {
  return {
    fetch,
    jobs: {
      fetchThemes: createJob<FetchThemesPayload>(),
      fetchRepository: createJob<FetchRepositoryPayload>(),
    },
    logger: {
      log: () => {},
      error: () => {},
    },
  }
}
