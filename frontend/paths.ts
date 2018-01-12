import * as path from 'path'

const isProduction = process.env.NODE_ENV === 'production'

export const entry = isProduction
  ? // Bundle the output of tsc /src in production.
    path.resolve(__dirname, './index.js')
  : // Bundle the ts src in development.
    path.resolve(__dirname, './index.ts')

export const output = isProduction
  ? // Path doesn't really matter because we ouput to memory.
    'build'
  : // Output to build directory in development.
    path.resolve(__dirname, '../build')
