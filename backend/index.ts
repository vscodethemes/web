/// <reference types="aws-lambda" />
import '@babel/polyfill'
import { Handler } from '@vscodethemes/types'
import * as Raven from 'raven'
import extractColors from './jobs/extractColors'
import extractThemes from './jobs/extractThemes'
import init from './jobs/init'
import runAll from './jobs/runAll'
import saveTheme from './jobs/saveTheme'
import scrapeExtensions from './jobs/scrapeExtensions'
import createServices from './services'

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

export default async function(event: any, context: AWSLambda.Context) {
  const services = createServices(raven)

  try {
    const handler = handlers[handlerName] as Handler
    if (!handler) throw new Error(`Invalid handler '${handlerName}'.`)

    const result = await handler(services, event)
    context.succeed(result)
  } catch (err) {
    await services.reportError(err)
    context.fail(err)
  }
}
