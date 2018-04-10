// tslint:disable no-empty
import {
  ExtractColorsPayload,
  ExtractThemesPayload,
  Job,
  SaveThemePayload,
  ScrapeExtensionsPayload,
  Services,
} from '@vscodethemes/types'
import * as fetch from 'jest-fetch-mock'

function createJob<P>(): Job<P> {
  return {
    create: () => Promise.resolve(),
    receive: () => Promise.resolve(JSON.parse('{}')),
    notify: () => Promise.resolve(),
    succeed: () => Promise.resolve(),
    fail: () => Promise.resolve(),
    retry: () => Promise.resolve(),
  }
}

export default function createServices(): Services {
  return {
    fetch,
    logger: {
      log: () => {},
      error: () => {},
    },
    index: {
      addObject: () => Promise.resolve(),
    },
    scrapeExtensions: createJob<ScrapeExtensionsPayload>(),
    extractThemes: createJob<ExtractThemesPayload>(),
    extractColors: createJob<ExtractColorsPayload>(),
    saveTheme: createJob<SaveThemePayload>(),
  }
}
