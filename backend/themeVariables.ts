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
export const tokens: TokenVariables = {
  keyword: {
    scope: ['keyword', 'storage', 'storage.type'],
    defaults: {
      foreground: null,
      fontStyle: 'normal',
    },
  },

  variable: {
    scope: [
      'variable',
      'meta.definition.variable.name',
      'support.variable',
      'punctuation.definition.variable',
      'variable.language',
      'constant.language',
    ],
    defaults: {
      foreground: null,
      fontStyle: 'normal',
    },
  },

  number: {
    scope: [
      'constant.numeric',
      'variable',
      'meta.definition.variable.name',
      'support.variable',
      'punctuation.definition.variable',
      'variable.language',
    ],
    defaults: {
      foreground: null,
      fontStyle: 'normal',
    },
  },

  literal: {
    scope: [
      'constant.language',
      'constant.numeric',
      'variable',
      'meta.definition.variable.name',
      'support.variable',
      'punctuation.definition.variable',
      'variable.language',
    ],
    defaults: {
      foreground: null,
      fontStyle: 'normal',
    },
  },

  string: {
    scope: ['string', 'punctuation'],
    defaults: {
      foreground: null,
      fontStyle: 'normal',
    },
  },

  comment: {
    scope: ['comment'],
    defaults: {
      foreground: null,
      fontStyle: 'normal',
    },
  },

  class: {
    scope: [
      'support.class',
      'support.type',
      'entity.name.type',
      'entity.name.class',
    ],
    defaults: {
      foreground: null,
      fontStyle: 'normal',
    },
  },

  function: {
    scope: ['entity.name.function', 'support.function', 'variable.function'],
    defaults: {
      foreground: null,
      fontStyle: 'normal',
    },
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
      'keyword',
      'storage',
      'storage.type',
    ],
    defaults: {
      foreground: null,
      fontStyle: 'normal',
    },
  },

  tag: {
    scope: [
      'entity.name.tag',
      'source.js.embedded.html',
      'keyword',
      'storage',
      'storage.type',
    ],
    defaults: {
      foreground: null,
      fontStyle: 'normal',
    },
  },

  attribute: {
    scope: [
      'entity.other.attribute-name',
      'keyword',
      'storage',
      'storage.type',
    ],
    defaults: {
      foreground: null,
      fontStyle: 'normal',
    },
  },
}
