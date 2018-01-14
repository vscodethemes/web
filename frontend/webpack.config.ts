import * as path from 'path'
import * as StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import * as webpack from 'webpack'
import { WebpackConfigOptions } from '../types/static'

const nodeEnv = process.env.NODE_ENV || 'development'
const isProduction = nodeEnv === 'production'
const isDevelopment = nodeEnv === 'development'

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
        use: ['babel-loader?presets[]=es2015', 'awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: ['url-loader?limit=10000'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    new StaticSiteGeneratorPlugin({
      paths: '/',
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
