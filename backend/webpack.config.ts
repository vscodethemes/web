import * as CopyWebpackPlugin from 'copy-webpack-plugin'
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

const buildPath = path.resolve(__dirname, './build')

const config: webpack.Configuration = {
  target: 'node',
  node: {
    // Disables webpack processing of __dirname to fix
    // incorrect value of '/' in the Lambda.
    __dirname: false,
  },
  devtool: 'source-map',
  entry: {
    'job-handler': path.resolve(__dirname, './index.ts'),
  },
  output: {
    filename: `[name].js`,
    path: buildPath,
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
      {
        test: /\.node$/,
        use: 'native-ext-loader',
      },
    ],
  },
  plugins: [
    // Copy language files from tokenizer to build.
    new CopyWebpackPlugin([
      {
        from: path.resolve(
          require.resolve('@vscodethemes/tokenizer'),
          '../languages/',
        ),
        to: path.resolve(buildPath, 'languages'),
      },
    ]),
  ],
}

export default config
