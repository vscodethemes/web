/// <reference types="aws-lambda" />
// Show correct line numbers in stack traces.
// Needs to be first import.
require('source-map-support').install({ environment: 'node' }) // tslint:disable-line

import '@babel/polyfill'
import { Handler } from '@vscodethemes/types'
import * as Raven from 'raven'
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
