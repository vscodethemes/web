const webpack = require('webpack')

module.exports = require('@zeit/next-typescript')({
  distDir: 'build',
  poweredByHeader: false,
  publicRuntimeConfig: {
    algoliaAppId: process.env.ALGOLIA_APP_ID,
    algoliaSearchKey: process.env.ALGOLIA_SEARCH_KEY,
    sentryDsn: process.env.SENTRY_DSN,
    GTM_ID: process.env.GTM_ID,
  },
})
