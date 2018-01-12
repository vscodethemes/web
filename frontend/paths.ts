import * as path from 'path'

const isProduction = process.env.NODE_ENV === 'production'

export const entry = isProduction
  ? // Bundle the output of tsc /src in production.
    path.resolve(__dirname, './index.js')
  : // Bundle the ts src in development.
    path.resolve(__dirname, './index.ts')

export const output = isProduction
  ? // Path doesn't matter because we ouput to memory in production
    // but still needs to be an abolute path to be a valid webpack config.
    path.resolve(__dirname, 'build')
  : // Output to build directory in development.
    path.resolve(__dirname, '../build')
