import fetch from 'node-fetch'
import { Services } from '../types/static'
import getThemeRepositories from './jobs/getThemeRepositories'

const jobs = {
  getThemeRepositories,
}

const job = jobs[process.env.JOB]

export default async function handler(event, context) {
  const services: Services = {
    fetch,
    // TODO: Create and receive actual jobs with AWS.SQS
    jobs: {
      create: async params => {
        console.log('Job created:', params) // tslint:disable-line
      },
      receive: async params => {
        console.log('Job received:', params) // tslint:disable-line
        return {}
      },
    },
    // Ouput to CloudWatch
    logger: {
      log: obj => {
        console.log(obj) // tslint:disable-line
      },
      error: error => {
        console.error(error) // tslint:disable-line
      },
    },
    event,
  }

  try {
    const result = await job(services)
    context.done(result)
  } catch (err) {
    context.fail(err)
  }
}
