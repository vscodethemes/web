import {
  Array,
  Literal,
  Null,
  Number,
  Partial,
  Record,
  Runtype,
  String,
  Tuple,
  Union,
} from 'runtypes'

export const PublisherRuntime: Runtype = Record({
  publisherName: String,
})

export const PropertyRuntime: Runtype = Record({
  key: String,
  value: String,
})

export const VersionRuntime: Runtype = Record({
  lastUpdated: String,
  properties: Array(PropertyRuntime),
})

export const StatisticRuntime: Runtype = Record({
  statisticName: String,
  value: Number,
})

export const ExtensionRuntime: Runtype = Record({
  extensionId: String,
  extensionName: String,
  lastUpdated: String,
  publishedDate: String,
  releaseDate: String,
  publisher: PublisherRuntime,
  versions: Array(VersionRuntime),
  statistics: Array(StatisticRuntime),
}).And(
  // Optional properties.
  Partial({
    displayName: String,
    shortDescription: String,
  }),
)

export const ExtensionQueryResultsRuntime: Runtype = Record({
  results: Tuple(Record({ extensions: Array(ExtensionRuntime) })),
})

export const ScrapeExtensionsPayloadRuntime: Runtype = Record({
  page: Number,
})

export const ExtractThemesPayloadRuntime: Runtype = Record({
  extensionId: String,
  extensionName: String,
  publisherName: String,
  lastUpdated: Number,
  publishedDate: Number,
  releaseDate: Number,
  repository: String,
  repositoryOwner: String,
  installs: Number,
  rating: Number,
  ratingCount: Number,
  trendingDaily: Number,
  trendingWeekly: Number,
  trendingMonthly: Number,
}).And(
  // Optional properties.
  Partial({
    displayName: String,
    shortDescription: String,
  }),
)

export const PackageJSONRuntime: Runtype = Record({
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

export const ThemeTypeRuntime: Runtype = Union(
  Literal('light'),
  Literal('dark'),
  Literal('hc'),
)

export const ExtractColorsPayloadRuntime: Runtype = ExtractThemesPayloadRuntime.And(
  Record({
    themeId: String,
    repositoryBranch: String,
    repositoryPath: String,
  }).And(
    Partial({
      // Optional properties.
      name: String,
      type: ThemeTypeRuntime,
    }),
  ),
)

export const ColorsRuntime: Runtype = Record({
  // VSCode GUI
  activityBarBackground: String,
  activityBarForeground: String,
  statusBarBackground: String,
  statusBarForeground: String,
  editorBackground: String,
  editorForeground: String,
  editorGroupHeaderTabsBackground: String,
  editorLineNumberForeground: String,
  tabActiveBackground: String,
  tabActiveForeground: String,
  tabInactiveBackground: String,
  tabInactiveForeground: String,
  // Syntax Tokens
  commentForeground: String,
  commentFontStyle: String,
  punctuationForeground: String,
  punctuationFontStyle: String,
  keywordForeground: String,
  keywordFontStyle: String,
  classForeground: String,
  classFontStyle: String,
  literalForeground: String,
  literalFontStyle: String,
  numberForeground: String,
  numberFontStyle: String,
  stringForeground: String,
  stringFontStyle: String,
  variableForeground: String,
  variableFontStyle: String,
  operatorForeground: String,
  operatorFontStyle: String,
  functionForeground: String,
  functionFontStyle: String,
  functionParamForeground: String,
  functionParamFontStyle: String,
  tagForeground: String,
  tagFontStyle: String,
  attributeForeground: String,
  attributeFontStyle: String,
  attributeValueForeground: String,
  attributeValueFontStyle: String,
  propertyForeground: String,
  propertyFontStyle: String,
  selectorForeground: String,
  selectorFontStyle: String,
}).And(
  Partial({
    // Optional properties.
    // These colors may not exist in the object but also may be null.
    editorGroupHeaderTabsBorder: String.Or(Null),
    tabActiveBorder: String.Or(Null),
    tabBorder: String.Or(Null),
    contrastActiveBorder: String.Or(Null),
    contrastBorder: String.Or(Null),
  }),
)

export const SaveThemePayloadRuntime: Runtype = ExtractColorsPayloadRuntime.And(
  Record({
    themeId: String,
    name: String,
    type: ThemeTypeRuntime,
    colors: ColorsRuntime,
  }),
)
