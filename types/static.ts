import { Request, RequestInit, Response } from 'node-fetch'
import { Static } from 'runtypes'
import {
  ExtensionQueryResultsRuntime,
  ExtensionRuntime,
  PropertyRuntime,
  PublisherRuntime,
  VersionRuntime,
} from './runtime'

export type ExtensionQueryResults = Static<typeof ExtensionQueryResultsRuntime>
export type Extension = Static<typeof ExtensionRuntime>
export type Property = Static<typeof PropertyRuntime>
export type Publisher = Static<typeof PublisherRuntime>
export type Version = Static<typeof VersionRuntime>

export interface Job<P> {
  queue: (params: P) => Promise<any>
  receive: () => Promise<null | P>
  notify: () => Promise<any>
}

export type Fetch = (url: string | Request, init?: RequestInit) => Promise<Response>

export interface FetchThemesPayload {
  page: number
}

export interface FetchRepositoryPayload {
  repository: string
}

export interface Services {
  fetch: Fetch
  logger: {
    log: (obj: any) => void
    error: (error: Error) => void
  }
  jobs: {
    fetchThemes: Job<FetchThemesPayload>
    fetchRepository: Job<FetchRepositoryPayload>
  }
}
