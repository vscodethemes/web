import getConfig from 'next/config'
import * as RavenServer from 'raven'
import * as RavenBrowser from 'raven-js'
const isServer = typeof window === 'undefined'
const { publicRuntimeConfig } = getConfig()
const { sentryDsn } = publicRuntimeConfig

let ravenInstance

if (sentryDsn) {
  const ravenConfig: RavenServer.ConstructorOptions = {
    environment: process.env.NODE_ENV,
    tags: {
      subject: 'frontend',
      commit: process.env.TRAVIS_COMMIT,
      from: isServer ? 'server' : 'browser',
    },
  }

  ravenInstance = isServer
    ? RavenServer.config(sentryDsn, ravenConfig).install()
    : RavenBrowser.config(sentryDsn, ravenConfig).install()
}

export default ravenInstance as RavenServer.Client
