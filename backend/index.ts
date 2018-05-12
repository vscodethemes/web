/// <reference types="aws-lambda" />
import '@babel/polyfill'
import { Handler } from '@vscodethemes/types'
import * as Raven from 'raven'
import * as promisify from 'util.promisify'
import createServices from './services'
import init from './jobs/init'
import runAll from './jobs/runAll'
import extractColors from './jobs/extractColors'
import extractThemes from './jobs/extractThemes'
import saveTheme from './jobs/saveTheme'
import scrapeExtensions from './jobs/scrapeExtensions'

const handlerName = process.env.HANDLER
const handlers: { [key: string]: Handler } = {
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
    subject: handlerName,
    commit: process.env.TRAVIS_COMMIT,
  },
}
const raven = Raven.config(process.env.SENTRY_DSN, ravenConfig).install()
const captureException = promisify(raven.captureException.bind(raven))

export default async function handler(event: any, context: AWSLambda.Context) {
  const services = createServices()

  try {
    const handler = handlers[handlerName] as Handler
    if (!handler) {
      throw new Error(`Invalid handler '${handlerName}'.`)
    }

    const result = await handler(services)
    context.succeed(result)
  } catch (err) {
    await captureException(err)
    context.fail(err)
  }
}
