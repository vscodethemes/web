import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import * as path from 'path'
import * as StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import * as webpack from 'webpack'

const nodeEnv = process.env.NODE_ENV || 'development'
const isProduction = nodeEnv === 'production'
const isDevelopment = nodeEnv === 'development'

process.env.BABEL_ENV = nodeEnv

const babelOptions = {
  presets: [
    'react',
    [
      'env',
      {
        targets: {
          browsers: ['last 2 versions'],
        },
        modules: false,
        useBuiltIns: true,
      },
    ],
  ],
}

const config: webpack.Configuration = {
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, './index.ts'),
  },
  output: {
    filename: `[name]-[hash].js`,
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: modulePath =>
          /node_modules/.test(modulePath) &&
          // These dependencies use arrow functions and need to be transpiled
          // in order to run UglifyJS against them.
          !/node_modules\/query-string/.test(modulePath) &&
          !/node_modules\/strict-uri-encode/.test(modulePath),
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: 'url-loader?limit=10000',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
        ALGOLIA_APP_ID: JSON.stringify(process.env.ALGOLIA_APP_ID),
        ALGOLIA_SEARCH_KEY: JSON.stringify(process.env.ALGOLIA_SEARCH_KEY),
        SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
        TRAVIS_COMMIT: JSON.stringify(process.env.TRAVIS_COMMIT),
      },
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, './assets/icon.png'),
      title: 'VSCodeThemes',
      persistentCache: false,
      emitStats: false,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new StaticSiteGeneratorPlugin({
      paths: ['/', '/trending/', '/new/'],
      locals: {
        enableDevServer: isDevelopment,
        gtmId: process.env.GTM_ID,
      },
    }),
  ],
}

if (isProduction) {
  config.plugins = [
    ...config.plugins,
    new UglifyJsPlugin({
      sourceMap: true,
      cache: true,
      parallel: true,
      uglifyOptions: {
        ecma: 8,
      },
    }),
  ]
}

export default config
