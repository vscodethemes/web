// tslint:disable no-console
import fetch from 'node-fetch'
import {
  FetchRepositoryPayload,
  FetchThemesPayload,
  Job,
  JobMessage,
  Services,
} from '../../types/static'

function createJob<P>(name: string): Job<P> {
  return {
    create: async (params: P) => {
      // TODO: Send message to SQS queue
    },
    receive: async () => {
      // TODO: Receive message from SQS queue
      const result: JobMessage<P> = JSON.parse('{}')
      return Promise.resolve(result)
    },
    notify: async () => {
      // TODO: Send notification to SNS topic
    },
    succeed: async (message: JobMessage<P>) => {
      // TODO: Delete message from SQS queue
    },
    fail: async (message: JobMessage<P>) => {
      // TODO: Send message to dead-letter SQS queue
    },
    retry: async (message: JobMessage<P>) => {
      // No-op: Don't delete the message, processing will timeout and
      // cause SQS to retry according to it's redrive policy.
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
