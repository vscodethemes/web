import * as http from 'http'

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
    renderPage: () => any
    err?: Error
  }

  export interface URLProps {
    url: URL
  }
}
