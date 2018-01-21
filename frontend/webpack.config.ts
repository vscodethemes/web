import { CheckerPlugin } from 'awesome-typescript-loader'
import * as path from 'path'
import * as StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import * as webpack from 'webpack'
import { WebpackConfigOptions } from '../types/static'

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
        use: 'awesome-typescript-loader',
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
