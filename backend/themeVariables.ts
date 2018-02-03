import { GUIVariables, TokenVariables } from '../types/static'

// GUI variable defaults extracted from
// https://github.com/Microsoft/vscode/blob/master/src/vs/workbench/common/theme.ts
export const gui: GUIVariables = {
  activityBarBackground: {
    key: 'activityBar.background',
    defaults: {
      dark: '#333333',
      light: '#2C2C2C',
      hc: '#000000',
    },
  },
  activityBarForeground: {
    key: 'activityBar.foreground',
    defaults: {
      dark: '#FFFFFF',
      light: '#FFFFFF',
      hc: '#FFFFFF',
    },
  },
  statusBarBackground: {
    key: 'statusBar.background',
    defaults: {
      dark: '#007ACC',
      light: '#007ACC',
      hc: null,
    },
  },
  statusBarForeground: {
    key: 'statusBar.foreground',
    defaults: {
      dark: '#FFFFFF',
      light: '#FFFFFF',
      hc: '#FFFFFF',
    },
  },
  editorBackground: {
    key: 'editor.background',
    defaults: {
      dark: '#1E1E1E',
      light: '#FFFFFE',
      hc: '#000000',
    },
  },
  editorForeground: {
    key: 'editor.foreground',
    defaults: {
      dark: '#BBBBBB',
      light: '#333333',
      hc: '#FFFFFF',
    },
  },
  editorGroupHeaderTabsBackground: {
    key: 'editorGroupHeader.tabsBackground',
    defaults: {
      dark: '#2D2D2D',
      light: '#ECECEC',
      hc: null,
    },
  },
  editorGroupHeaderTabsBorder: {
    key: 'editorGroupHeader.tabsBorder',
    defaults: {
      dark: null,
      light: null,
      hc: '#6FC3DF',
    },
  },
  editorLineNumberForeground: {
    key: 'editorLineNumber.foreground',
    defaults: {
      dark: '#5A5A5A',
      light: '#2B91AF',
      hc: '#FFFFFF',
    },
  },
  tabActiveBackground: {
    key: 'tab.activeBackground',
    defaults: {
      dark: '#1E1E1E',
      light: '#FFFFFE',
      hc: '#000000',
    },
  },
  tabActiveForeground: {
    key: 'tab.activeForeground',
    defaults: {
      dark: '#FFFFFF',
      light: '#333333',
      hc: '#FFFFFF',
    },
  },
  tabActiveBorder: {
    key: 'tab.activeBorder',
    defaults: {
      dark: null,
      light: null,
      hc: null,
    },
  },
  tabBorder: {
    key: 'tab.border',
    defaults: {
      dark: '#252526',
      light: '#F3F3F3',
      hc: '#6FC3DF',
    },
  },
  tabInactiveBackground: {
    key: 'tab.inactiveBackground',
    defaults: {
      dark: '#2D2D2D',
      light: '#ECECEC',
      hc: null,
    },
  },
  tabInactiveForeground: {
    key: 'tab.inactiveForeground',
    defaults: {
      dark: '#8E8E8E', // tab.activeForeground.dark at 50% opacity with background.
      light: '#999999', // tab.activeForeground.light at 50% opacity with background.
      hc: '#FFFFFF',
    },
  },
  contrastActiveBorder: {
    key: 'contrastActiveBorder',
    defaults: {
      light: null,
      dark: null,
      hc: '#F38518',
    },
  },
  contrastBorder: {
    key: 'contrastBorder',
    defaults: {
      light: null,
      dark: null,
      hc: '#6FC3DF',
    },
  },
}

// Token scopes are pulled from https://www.sublimetext.com/docs/3/scope_naming.html
const keywordScopes = ['keyword', 'keyword.control', 'storage', 'storage.type']
export const tokens: TokenVariables = {
  comment: {
    scope: ['comment', 'comment.line', 'comment.block'],
  },
  punctuation: {
    scope: [
      'meta.block',
      'punctuation.section.block.begin',
      'punctuation.section.block.end',
      'meta.braces',
      'punctuation.section.braces.begin',
      'punctuation.section.braces.end',
      'meta.group',
      'punctuation.section.group.begin',
      'punctuation.section.group.end',
      'meta.parens',
      'punctuation.section.parens.begin',
      'punctuation.section.parens.end',
    ],
  },
  keyword: {
    scope: keywordScopes,
  },
  class: {
    scope: [
      'support.class',
      'support.type',
      'entity.name.type',
      'entity.name.class',
      'meta.class',
      // Use keyword scopes as a fallback.
      ...keywordScopes,
    ],
  },
  literal: {
    scope: ['constant.language', 'constant.numeric'],
  },
  number: {
    scope: ['constant.numeric'],
  },
  string: {
    scope: [
      'string',
      'string.quoted.single',
      'string.quoted.double',
      'string.quoted.triple',
    ],
  },
  variable: {
    scope: ['variable', 'variable.other', 'variable.other.readwrite'],
  },
  operator: {
    scope: [
      'keyword.operator',
      'keyword.operator.assignment',
      'keyword.operator.arithmetic',
      'keyword.operator.bitwise',
      'keyword.operator.logical',
      'keyword.operator.word',
    ],
  },
  function: {
    scope: [
      'meta.function',
      'storage.function',
      'support.function',
      'entity.name.function',
      'variable.function',
    ],
  },
  functionParam: {
    scope: ['meta.function.parameters', 'variable.parameter'],
  },
  // html
  tag: {
    scope: ['entity.name.tag', 'meta.tag'],
  },
  attribute: {
    scope: ['entity.other.attribute-name', 'meta.tag'],
  },
  attributeValue: {
    scope: [
      'string.quoted.double.html',
      'string.unquoted.html',
      'punctuation.definition.string.begin.html',
      'punctuation.definition.string.end.html',
    ],
  },
  // css
  property: {
    scope: [
      'punctuation.section.property-list.css',
      'support.type.property-name.media.css',
      'support.type.vendor-prefix.css',
    ],
  },
  selector: {
    scope: [
      'entity.name.tag.css',
      'meta.selector',
      'entity.other.attribute-name.class.css',
      'entity.other.attribute-name.id.css',
      'entity.other.attribute-name.parent-selector.css',
      'entity.other.attribute-name.pseudo-class.css',
      'entity.other.attribute-name.pseudo-element.css',
    ],
  },
}
