// GUI variables are extracted from the theme's colors.
// VSCode color reference: https://code.visualstudio.com/docs/getstarted/theme-color-reference
// Defaults were pulled from https://github.com/Microsoft/vscode/blob/master/src/vs/workbench/common/theme.ts
// Example theme json: https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro.json

import * as Color from 'color'

const transparent = (color: string, alpha: number) =>
  color
    ? Color(color)
        .alpha(alpha)
        .toString()
    : null

export default {
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
  activityBarBorder: {
    key: 'activityBar.border',
    defaults: {
      dark: null,
      light: null,
      hc: null,
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
      dark: null,
      light: null,
      hc: null,
      // dark: '#1E1E1E',
      // light: '#FFFFFE',
      // hc: '#000000',
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
      dark: null,
      light: null,
      hc: null,
      // dark: '#252526',
      // light: '#F3F3F3',
      // hc: '#6FC3DF',
    },
  },
  tabInactiveBackground: {
    key: 'tab.inactiveBackground',
    defaults: {
      dark: null,
      light: null,
      hc: null,
      // dark: '#2D2D2D',
      // light: '#ECECEC',
      // hc: null,
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
      dark: null,
      light: null,
      hc: '#F38518',
    },
  },
  contrastBorder: {
    key: 'contrastBorder',
    defaults: {
      dark: null,
      light: null,
      hc: '#6FC3DF',
    },
  },
  titleBarActiveBackground: {
    key: 'titleBar.activeBackground',
    defaults: {
      dark: '#3C3C3C',
      light: '#DDDDDD',
      hc: '#000000',
    },
  },
  titleBarActiveForeground: {
    key: 'titleBar.activeForeground',
    defaults: {
      dark: '#CCCCCC',
      light: '#333333',
      hc: '#FFFFFF',
    },
  },
  titleBarInactiveBackground: {
    key: 'titleBar.inactiveBackground',
    defaults: {
      dark: (colors: any) => transparent(colors.titleBarActiveBackground, 0.6),
      light: (colors: any) => transparent(colors.titleBarActiveBackground, 0.6),
      hc: null,
    },
  },
  titleBarInactiveForeground: {
    key: 'titleBar.inactiveForeground',
    defaults: {
      dark: (colors: any) => transparent(colors.titleBarActiveForeground, 0.6),
      light: (colors: any) => transparent(colors.titleBarActiveForeground, 0.6),
      hc: null,
    },
  },
  titleBarBorder: {
    key: 'titleBar.border',
    defaults: {
      dark: null,
      light: null,
      hc: '#6FC3DF',
    },
  },
}
