// GUI variables are extracted from the theme's colors.
// VSCode color reference: https://code.visualstudio.com/docs/getstarted/theme-color-reference
// Defaults were pulled from https://github.com/Microsoft/vscode/blob/master/src/vs/workbench/common/theme.ts
// Example theme json: https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro.json

export interface GUIVariables {
  [key: string]: {
    key: string
    defaults: {
      light: string | null
      dark: string | null
      hc: string | null
    }
  }
}

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
