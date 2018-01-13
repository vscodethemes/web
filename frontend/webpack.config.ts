import * as path from 'path'
import * as StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import * as webpack from 'webpack'
import { WebpackConfigOptions } from '../types/static'

const nodeEnv = process.env.NODE_ENV || 'development'
// const isProduction = nodeEnv === 'production'
const isDevelopment = nodeEnv === 'development'

const config: webpack.Configuration = {
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, './index.ts'),
  },
  output: {
    filename: `[name].js`,
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
      // TODO: Do we still need to do this? Maybe only in prod because we aren't minifying in dev.
      // We need to run js through babel because uglify doesn't support all of es2015.
      // https://github.com/terinjokes/gulp-uglify/issues/66
      // {
      //   test: /\.js?$/,
      //   use: ['babel-loader?presets[]=es2015'],
      //   exclude: /node_modules/,
      // },
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

export default config
