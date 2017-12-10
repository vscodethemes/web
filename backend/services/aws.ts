// tslint:disable no-console
import fetch from 'node-fetch'
import { FetchRepositoryPayload, FetchThemesPayload, Job, Services } from '../../types/static'

function createJob<P>(name: string): Job<P> {
  return {
    queue: async params => {
      // TODO: Send message to SQS queue
    },
    receive: async () => {
      // TODO: Receive message from SQS queue
      return Promise.resolve(JSON.parse('{}'))
    },
    notify: async () => {
      // TODO: Send notification to SNS topic
    },
  }
}

export default function createServices(): Services {
  return {
    fetch,
    jobs: {
      fetchThemes: createJob<FetchThemesPayload>('fetchThemes'),
      fetchRepository: createJob<FetchRepositoryPayload>('fetchRepository'),
    },
    // Ouputs to CloudWatch
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
