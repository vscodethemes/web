// tslint:disable no-console
import fetch from 'node-fetch'
import { Job, Services } from '../../types/static'

function createJob<P>(name: string, receiveMock: P): Job<P> {
  return {
    queue: async params => {
      console.log('Job queued:', name, params)
      return {}
    },
    receive: async () => {
      console.log('Job received:', 'fetchThemes')
      return receiveMock
    },
    notify: async () => {
      console.log('Notify job:', name)
    },
  }
}

export default function createServices(): Services {
  return {
    fetch,
    jobs: {
      fetchThemes: createJob('fetchThemes', { page: 1 }),
      fetchRepository: createJob('fetchRepository', { repository: 'test' }),
    },
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
