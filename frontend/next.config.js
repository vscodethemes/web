module.exports = require('@zeit/next-typescript')({
  distDir: 'build',
  publicRuntimeConfig: {
    algoliaAppId: '4DSENNCE1V',
    algoliaSearchKey: 'fb233d35cbb3656ddeab014eb4bf3eb8',
    sentryDsn: process.env.TF_VAR_sentry_dsn,
  },
})
