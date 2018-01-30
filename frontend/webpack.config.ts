import { CheckerPlugin } from 'awesome-typescript-loader'
import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import * as path from 'path'
import * as StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import * as webpack from 'webpack'

const nodeEnv = process.env.NODE_ENV || 'development'
const isProduction = nodeEnv === 'production'
const isDevelopment = nodeEnv === 'development'

process.env.BABEL_ENV = nodeEnv

const config: webpack.Configuration = {
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, './index.ts'),
  },
  output: {
    filename: `[name]-[hash].js`,
    path: path.resolve(__dirname, '../build/frontend'),
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader?useBabel=true&useCache=true',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: 'url-loader?limit=10000',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
        ALGOLIA_APP_ID: JSON.stringify(process.env.ALGOLIA_APP_ID),
        ALGOLIA_SEARCH_KEY: JSON.stringify(process.env.ALGOLIA_SEARCH_KEY),
      },
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, './assets/icon.png'),
      title: 'VSCodeThemes',
      persistentCache: true,
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
      paths: ['/', '/trending', '/new'],
      locals: {
        enableDevServer: isDevelopment,
      },
    }),
  ],
}

if (isProduction) {
  config.plugins = [...config.plugins, new webpack.optimize.UglifyJsPlugin()]
}

export default config
