import { LineToken } from '@vscodethemes/tokenizer'
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
  SaveThemePayloadRuntime,
  ScrapeExtensionsPayloadRuntime,
  ThemeTypeRuntime,
  VersionRuntime,
} from './runtime'

export type ExtensionQueryResults = Static<typeof ExtensionQueryResultsRuntime>
export type Extension = Static<typeof ExtensionRuntime>
export type ScrapeExtensionsPayload = Static<
  typeof ScrapeExtensionsPayloadRuntime
>
export type Property = Static<typeof PropertyRuntime>
export type Publisher = Static<typeof PublisherRuntime>
export type Version = Static<typeof VersionRuntime>
export type Colors = Static<typeof ColorsRuntime>
export type ExtractColorsPayload = Static<typeof ExtractColorsPayloadRuntime>
export type ExtractThemesPayload = Static<typeof ExtractThemesPayloadRuntime>
export type PackageJSON = Static<typeof PackageJSONRuntime>
export type SaveThemePayload = Static<typeof SaveThemePayloadRuntime>
export type ThemeType = Static<typeof ThemeTypeRuntime>

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

export interface IndexObject {
  objectID: string
  [key: string]: any
}

export interface Services {
  fetch: Fetch
  logger: {
    log: (obj: any) => void
    error: (error: Error) => void
  }
  reportError: (err: Error) => Promise<any>
  tokenizer: {
    create: (
      themeSettings: any,
      language: string,
    ) => {
      line: (line: string) => LineToken[]
      text: (text: string) => LineToken[][]
    }
  }
  index: {
    addObjects: (objects: IndexObject[]) => Promise<any>
  }
  scrapeExtensions: Job<ScrapeExtensionsPayload>
  extractThemes: Job<ExtractThemesPayload>
  extractColors: Job<ExtractColorsPayload>
  saveTheme: Job<SaveThemePayload>
}

export type Handler = (services: Services, event?: any) => Promise<any>

export interface RepositoryInfo {
  repository: string
  repositoryOwner: string
}

export interface Theme extends ExtractColorsPayload {
  objectID: string
  themeId: string
  themeName: string
  themeType: ThemeType
  colors: Colors
  language: string
  tokens: LineToken[][]
}

export enum SortByOptions {
  installs = 'installs',
  trending = 'trending',
  new = 'new',
}
export enum LanguageOptions {
  javascript = 'javascript',
  css = 'css',
  html = 'html',
}

export interface SearchParams {
  sortBy: SortByOptions
  search?: string
  dark?: boolean
  light?: boolean
  page?: number
  perPage?: number
  lang?: LanguageOptions
  extensionName?: string
  publisherName?: string
  repositoryOwner?: string
  repository?: string
}

export interface Icons {
  [key: string]: {
    viewBox: string
    path: string
  }
}
