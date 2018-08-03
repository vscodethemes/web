// tslint:disable no-empty
import {
  ExtractThemesPayload,
  Job,
  SaveThemePayload,
  ScrapeExtensionsPayload,
  Services,
} from '@vscodethemes/types'
import fetch from 'node-fetch'

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
    reportError: async () => {},
    tokenizer: {
      create: (theme, language) => ({
        line: () => [],
        text: () => [],
      }),
    },
    index: {
      addObjects: () => Promise.resolve(),
    },
    scrapeExtensions: createJob<ScrapeExtensionsPayload>(),
    extractThemes: createJob<ExtractThemesPayload>(),
    saveTheme: createJob<SaveThemePayload>(),
  }
}
