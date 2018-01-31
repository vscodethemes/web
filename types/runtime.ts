import {
  Array,
  Literal,
  Null,
  Number,
  Record,
  String,
  Tuple,
  Union,
} from 'runtypes'

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

export const StatisticRuntime = Record({
  statisticName: String,
  value: Number,
})

export const ExtensionRuntime = Record({
  extensionId: String,
  extensionName: String,
  lastUpdated: String,
  publishedDate: String,
  releaseDate: String,
  shortDescription: String,
  publisher: PublisherRuntime,
  versions: Array(VersionRuntime),
  statistics: Array(StatisticRuntime),
})

export const ExtensionQueryResultsRuntime = Record({
  results: Tuple(Record({ extensions: Array(ExtensionRuntime) })),
})

export const ScrapeThemesPayloadRuntime = Record({
  page: Number,
})

export const ExtractThemesPayloadRuntime = Record({
  extensionId: String,
  extensionName: String,
  publisherName: String,
  lastUpdated: Number,
  publishedDate: Number,
  releaseDate: Number,
  shortDescription: String,
  repository: String,
  repositoryOwner: String,
  installs: Number,
  rating: Number,
  ratingCount: Number,
  trendingDaily: Number,
  trendingWeekly: Number,
  trendingMonthly: Number,
})

export const PackageJSONRuntime = Record({
  contributes: Record({
    themes: Array(
      Record({
        label: String,
        uiTheme: String,
        path: String,
      }),
    ),
  }),
})

export const ExtractColorsPayloadRuntime = ExtractThemesPayloadRuntime.And(
  Record({
    repositoryBranch: String,
    repositoryPath: String,
  }),
)

export const ColorsRuntime = Record({
  activityBarBackground: String,
  activityBarForeground: String,
  statusBarBackground: String,
  statusBarForeground: String,
  editorBackground: String,
  editorGroupHeaderTabsBackground: String,
  editorLineNumberForeground: String,
  tabActiveBackground: String,
  tabActiveForeground: String,
  tabInactiveBackground: String,
  tabInactiveForeground: String,
  editorGroupHeaderTabsBorder: String.Or(Null),
  tabActiveBorder: String.Or(Null),
  tabBorder: String.Or(Null),
  contrastActiveBorder: String.Or(Null),
  contrastBorder: String.Or(Null),
})

export const TokensRuntime = Record({
  keywordForeground: String,
  keywordFontStyle: String,
  variableForeground: String,
  variableFontStyle: String,
  literalForeground: String,
  literalFontStyle: String,
  numberForeground: String,
  numberFontStyle: String,
  stringForeground: String,
  stringFontStyle: String,
  commentForeground: String,
  commentFontStyle: String,
  classForeground: String,
  classFontStyle: String,
  functionForeground: String,
  functionFontStyle: String,
  selectorForeground: String,
  selectorFontStyle: String,
  tagForeground: String,
  tagFontStyle: String,
  attributeForeground: String,
  attributeFontStyle: String,
})

export const ThemeTypeRuntime = Union(
  Literal('light'),
  Literal('dark'),
  Literal('hc'),
)

export const SaveThemePayloadRuntime = ExtractColorsPayloadRuntime.And(
  Record({
    name: String,
    type: ThemeTypeRuntime,
    colors: ColorsRuntime,
    tokens: TokensRuntime,
  }),
)
