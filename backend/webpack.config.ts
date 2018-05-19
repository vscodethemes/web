import * as path from 'path'
import * as webpack from 'webpack'

const babelOptions = {
  presets: [
    [
      'env',
      {
        targets: {
          node: '8.10',
        },
      },
    ],
  ],
}

const config: webpack.Configuration = {
  target: 'node',
  devtool: 'source-map',
  entry: {
    'job-handler': path.resolve(__dirname, './index.ts'),
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
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
    ],
  },
}

export default config
