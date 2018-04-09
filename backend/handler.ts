/// <reference types="aws-lambda" />

import * as Raven from 'raven'
import * as promisify from 'util.promisify'
import { JobHandlers } from '../types/static'
import extractColors from './jobs/extractColors'
import extractThemes from './jobs/extractThemes'
import init from './jobs/init'
import runAll from './jobs/runAll'
import saveTheme from './jobs/saveTheme'
import scrapeExtensions from './jobs/scrapeExtensions'
import createServices from './services'

const jobName = process.env.JOB
const jobs: JobHandlers = {
  init,
  runAll,
  scrapeExtensions,
  extractThemes,
  extractColors,
  saveTheme,
}

const ravenConfig: Raven.ConstructorOptions = {
  environment: process.env.NODE_ENV,
  tags: {
    subject: jobName,
    commit: process.env.TRAVIS_COMMIT,
  },
}
const raven = Raven.config(process.env.SENTRY_DSN, ravenConfig).install()
const captureException = promisify(raven.captureException.bind(raven))

export default async function handler(event: any, context: AWSLambda.Context) {
  const services = createServices()

  try {
    const job = jobs[jobName]
    if (!job) {
      throw new Error(`Invalid job '${jobName}'.`)
    }

    const result = await job(services)
    context.succeed(result)
  } catch (err) {
    await captureException(err)
    context.fail(err)
  }
}
