const webpack = require('webpack')

module.exports = require('@zeit/next-typescript')({
  distDir: 'build',
  poweredByHeader: false,
  publicRuntimeConfig: {
    sentryDsn: process.env.TF_VAR_sentry_dsn,
    algoliaAppId: process.env.TF_VAR_algolia_app_id,
    algoliaIndex: process.env.TF_VAR_algolia_index,
    algoliaSearchKey: process.env.ALGOLIA_SEARCH_KEY,
    host: process.env.HOST,
  },
  onDemandEntries: {
    // Cache all pages, fixes "Invalid element type error" that occurs when
    // disposing pages. This is a band-aid until I can figure out why.
    pagesBufferLength: 6,
  },
})
