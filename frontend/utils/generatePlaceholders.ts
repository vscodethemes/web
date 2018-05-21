import { Theme } from '@vscodethemes/types'
import theme from '../theme'

const sym = Symbol()

export function isPlaceholder(obj: any) {
  return obj.__placeholder === sym
}

export default function generatePlaceholderThemes(count: number): Theme[] {
  return Array.from(new Array(count), (_, index) => ({
    __placeholder: sym,
    objectID: `placeholder-${index}`,
    themeId: '',
    themeName: '',
    themeUrl: '',
    extensionId: '',
    themeType: null,
    name: '',
    displayName: '',
    shortDescription: '',
    extensionName: '',
    publisherName: '',
    repository: '',
    repositoryOwner: '',
    repositoryBranch: '',
    repositoryPath: '',
    lastUpdated: -1,
    publishedDate: -1,
    releaseDate: -1,
    installs: -1,
    rating: -1,
    ratingCount: -1,
    trendingDaily: -1,
    trendingWeekly: -1,
    trendingMonthly: -1,
    colors: {
      // VSCode GUI
      activityBarBackground: theme.colors.background,
      activityBarForeground: theme.colors.background,
      statusBarBackground: theme.colors.background,
      statusBarForeground: theme.colors.background,
      editorBackground: theme.colors.background,
      editorForeground: theme.colors.textMuted,
      editorGroupHeaderTabsBackground: theme.colors.background,
      editorGroupHeaderTabsBorder: theme.colors.background,
      editorLineNumberForeground: theme.colors.background,
      tabActiveBackground: theme.colors.background,
      tabActiveForeground: theme.colors.background,
      tabActiveBorder: theme.colors.background,
      tabBorder: theme.colors.inputBorder,
      tabInactiveBackground: theme.colors.background,
      tabInactiveForeground: theme.colors.background,
      contrastActiveBorder: null,
      contrastBorder: null,
    },
    languages: {
      javascript: '',
      css: '',
      html: '',
    },
  }))
}
