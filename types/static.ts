import { Request, RequestInit, Response } from 'node-fetch'
import { Static } from 'runtypes'
import {
  ColorsRuntime,
  ExtensionQueryResultsRuntime,
  ExtensionRuntime,
  ExtractColorsPayloadRuntime,
  ExtractThemesPayloadRuntime,
  PackageJSONRuntime,
  PropertyRuntime,
  PublisherRuntime,
  ScrapeThemesPayloadRuntime,
  VersionRuntime,
} from './runtime'

export type ExtensionQueryResults = Static<typeof ExtensionQueryResultsRuntime>
export type Extension = Static<typeof ExtensionRuntime>
export type ScrapeThemesPayload = Static<typeof ScrapeThemesPayloadRuntime>
export type Property = Static<typeof PropertyRuntime>
export type Publisher = Static<typeof PublisherRuntime>
export type Version = Static<typeof VersionRuntime>
export type ExtractColorsPayload = Static<typeof ExtractColorsPayloadRuntime>
export type ExtractThemesPayload = Static<typeof ExtractThemesPayloadRuntime>
export type PackageJSON = Static<typeof PackageJSONRuntime>
export type Colors = Static<typeof ColorsRuntime>

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

export interface Services {
  fetch: Fetch
  logger: {
    log: (obj: any) => void
    error: (error: Error) => void
  }
  scrapeThemes: Job<ScrapeThemesPayload>
  extractThemes: Job<ExtractThemesPayload>
  extractColors: Job<ExtractColorsPayload>
}

export type JobHandler = (services: Services) => Promise<any>

export interface JobHandlers {
  [key: string]: JobHandler
}

export interface RepositoryInfo {
  repository: string
  repositoryOwner: string
}
