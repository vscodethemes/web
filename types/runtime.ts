import { Array, Record, String, Tuple } from 'runtypes'

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
