// tslint:disable no-console
import fetch from 'node-fetch'
import { Job, JobMessage, Services } from '../../types/static'

function createJob<P>(name: string, receiveMock: JobMessage<P>): Job<P> {
  return {
    create: async params => {
      console.log('Job queued:', name, params)
      return {}
    },
    receive: async (): Promise<JobMessage<P>> => {
      console.log('Job received:', 'fetchThemes')
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
    jobs: {
      // TODO: Allow receive mocks to be passed in via CLI.
      fetchThemes: createJob('fetchThemes', {
        messageId: '',
        receiptHandle: '',
        payload: { page: 1 },
      }),
      fetchRepository: createJob('fetchRepository', {
        messageId: '',
        receiptHandle: '',
        payload: { repository: 'test' },
      }),
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
