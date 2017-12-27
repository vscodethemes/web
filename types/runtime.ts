import { Array, Number, Record, String, Tuple } from 'runtypes'

export const PublisherRuntime = Record({
  publisherName: String,
})

export const PropertyRuntime = Record({
  key: String,
  value: String,
})

export const VersionRuntime = Record({
  lastUpdated: String,
  properties: Array(PropertyRuntime),
})

export const ExtensionRuntime = Record({
  extensionName: String,
  publisher: PublisherRuntime,
  versions: Array(VersionRuntime),
})

export const ExtensionQueryResultsRuntime = Record({
  results: Tuple(Record({ extensions: Array(ExtensionRuntime) })),
})

export const FetchThemesPayloadRuntime = Record({
  page: Number,
})

export const ProcessRepoPayloadRuntime = Record({
  repository: String,
  installs: Number,
  rating: Number,
  ratingCount: Number,
  trendingDaily: Number,
  trendingWeekly: Number,
  trendingMonthly: Number,
})
