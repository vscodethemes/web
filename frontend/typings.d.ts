declare module 'emotion-server'
declare module 'express-useragent'
declare module 'raw-loader!*'
declare module 'react-syntax-highlighter/*'

import * as http from 'http'
import 'next'
declare module 'next' {
  interface Query {
    [key: string]: string
  }

  interface URL {
    asPath: string
    pathname: string
    query: Query
    back: () => any
    push: () => any
    pushTo: () => any
    replace: () => any
    replaceTo: () => any
  }

  export interface Context {
    asPath: string
    pathname: string
    query: Query
    req?: http.IncomingMessage
    res?: http.ServerResponse
  }

  export interface URLProps {
    url: URL
  }
}
