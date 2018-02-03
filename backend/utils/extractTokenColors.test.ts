import extractTokenColors from './extractTokenColors'

const tokenColors: any[] = [
  {
    scope: 'comment', // Scope as string
    settings: {
      foreground: 'commentForeground',
      fontStyle: 'commentFontStyle',
    },
  },
  {
    scope: ['meta.block'], // Scope as array
    settings: {
      foreground: 'punctuationForeground',
      fontStyle: 'punctuationFontStyle',
    },
  },
  {
    scope: 'keyword,keyword.control', // Scope as comma seprated string
    settings: {
      foreground: 'keywordForeground',
      fontStyle: 'keywordFontStyle',
    },
  },
  {
    scope: 'entity.name.class', // Fallback
    settings: { foreground: 'classForeground', fontStyle: 'classFontStyle' },
  },
  {
    scope: 'constant.language',
    settings: {
      foreground: 'literalForeground',
      fontStyle: 'literalFontStyle',
    },
  },
  {
    scope: 'constant.numeric',
    settings: { foreground: 'numberForeground', fontStyle: 'numberFontStyle' },
  },
  {
    scope: 'string',
    settings: { foreground: 'stringForeground', fontStyle: 'stringFontStyle' },
  },
  // Use default
  // {
  //   scope: 'variable',
  //   settings: {
  //     foreground: 'variableForeground',
  //     fontStyle: 'variableFontStyle',
  //   },
  // },
  {
    scope: 'keyword.operator',
    settings: {
      foreground: 'operatorForeground',
      fontStyle: 'operatorFontStyle',
    },
  },
  {
    scope: 'meta.function',
    settings: {
      foreground: 'functionForeground',
      fontStyle: 'functionFontStyle',
    },
  },
  {
    scope: 'meta.function.parameters',
    settings: {
      foreground: 'functionParamForeground',
      fontStyle: 'functionParamFontStyle',
    },
  },
  {
    scope: 'entity.name.tag',
    settings: { foreground: 'tagForeground', fontStyle: 'tagFontStyle' },
  },
  {
    scope: 'entity.other.attribute-name',
    settings: {
      foreground: 'attributeForeground',
      fontStyle: 'attributeFontStyle',
    },
  },
  {
    scope: 'string.quoted.double.html',
    settings: {
      foreground: 'attributeValueForeground',
      fontStyle: 'attributeValueFontStyle',
    },
  },
  {
    scope: 'punctuation.section.property-list.css',
    settings: {
      foreground: 'propertyForeground',
      fontStyle: 'propertyFontStyle',
    },
  },
  {
    scope: 'entity.name.tag.css',
    settings: {
      foreground: 'selectorForeground',
      fontStyle: 'selectorFontStyle',
    },
  },
]

test('Should extract token color variables', () => {
  expect(extractTokenColors('editorForeground', tokenColors)).toEqual({
    commentForeground: 'commentForeground',
    commentFontStyle: 'commentFontStyle',
    punctuationForeground: 'punctuationForeground',
    punctuationFontStyle: 'punctuationFontStyle',
    keywordForeground: 'keywordForeground',
    keywordFontStyle: 'keywordFontStyle',
    classForeground: 'classForeground',
    classFontStyle: 'classFontStyle',
    literalForeground: 'literalForeground',
    literalFontStyle: 'literalFontStyle',
    numberForeground: 'numberForeground',
    numberFontStyle: 'numberFontStyle',
    stringForeground: 'stringForeground',
    stringFontStyle: 'stringFontStyle',
    variableForeground: 'editorForeground', // Default
    variableFontStyle: 'normal', // Default
    operatorForeground: 'operatorForeground',
    operatorFontStyle: 'operatorFontStyle',
    functionForeground: 'functionForeground',
    functionFontStyle: 'functionFontStyle',
    functionParamForeground: 'functionParamForeground',
    functionParamFontStyle: 'functionParamFontStyle',
    tagForeground: 'tagForeground',
    tagFontStyle: 'tagFontStyle',
    attributeForeground: 'attributeForeground',
    attributeFontStyle: 'attributeFontStyle',
    attributeValueForeground: 'attributeValueForeground',
    attributeValueFontStyle: 'attributeValueFontStyle',
    propertyForeground: 'propertyForeground',
    propertyFontStyle: 'propertyFontStyle',
    selectorForeground: 'selectorForeground',
    selectorFontStyle: 'selectorFontStyle',
  })
})
