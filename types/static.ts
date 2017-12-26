import { Request, RequestInit, Response } from 'node-fetch'
import { Static } from 'runtypes'
import {
  ExtensionQueryResultsRuntime,
  ExtensionRuntime,
  FetchThemesPayloadRuntime,
  PropertyRuntime,
  PublisherRuntime,
  VersionRuntime,
} from './runtime'

export type ExtensionQueryResults = Static<typeof ExtensionQueryResultsRuntime>
export type Extension = Static<typeof ExtensionRuntime>
export type FetchThemesPayload = Static<typeof FetchThemesPayloadRuntime>
export type Property = Static<typeof PropertyRuntime>
export type Publisher = Static<typeof PublisherRuntime>
export type Version = Static<typeof VersionRuntime>

export interface JobMessage<P> {
  // An identifier associated with the act of receiving the message.
  // A new receipt handle is returned every time you receive a message.
  // When deleting a message, you provide the last received receipt handle to delete the message.
  receiptHandle: string
  // The message contents.
  payload: P
}

export interface Job<P> {
  create: (params: P) => Promise<any>
  receive: () => Promise<null | JobMessage<P>>
  notify: () => Promise<any>
  succeed: (message: JobMessage<P>) => Promise<any>
  fail: (message: JobMessage<P>, error: Error) => Promise<any>
  retry: (message: JobMessage<P>) => Promise<any>
}

export type Fetch = (
  url: string | Request,
  init?: RequestInit,
) => Promise<Response>

export interface FetchRepositoryPayload {
  repository: string
}

export interface Services {
  fetch: Fetch
  logger: {
    log: (obj: any) => void
    error: (error: Error) => void
  }
  fetchThemes: Job<FetchThemesPayload>
  // fetchRepository: Job<FetchRepositoryPayload>
}

export type JobHandler = (services: Services) => Promise<any>

export interface JobHandlers {
  [key: string]: JobHandler
}
