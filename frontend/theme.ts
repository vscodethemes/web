import * as merge from 'merge'

const spacingUnit = 10
export const rootFontSize = 14

const gutters = {
  xs: spacingUnit / 2,
  sm: spacingUnit,
  md: spacingUnit * 2,
  lg: spacingUnit * 4,
  xl: spacingUnit * 7,
}

const pageSizes = {
  max: 780,
  min: 660,
}

const colors = {
  palette: ['#00A8FF', '#B8E63B', '#880055', '#E70258', '#FAF100'],
  background: '#202026',
  backgroundDark: '#18181F',
  inputBackground: '#28282F',
  inputBorder: '#18181F',
  text: '#D4D4D4',
  textMuted: '#606066',
}

const em = (px: number) => `${Math.round((px / rootFontSize) * 100) / 100}em`

const theme = {
  colors,
  gutters,
  pageSizes,
  fonts: {
    sansSerif:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif',
    monospace:
      '"SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace',
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    xl: 28,
  },
  borderRadius: {
    sm: 4,
    md: 6,
  },
  shadows: {
    sm: '0px 6px 20px rgba(0, 0, 0, 0.2)',
    md: '0px 6px 20px rgba(0, 0, 0, 0.35)',
  },
  breakpoints: {
    pageMax: `@media (max-width: ${em(pageSizes.max)})`,
    pageMin: `@media (max-width: ${em(pageSizes.min)})`,
  },
  header: {
    height: 35,
    heightCollapsed: 40,
    backgroundColor: colors.inputBorder,
  },
  container: {
    gutter: gutters.lg,
  },
  animation: {
    bezier: 'cubic-bezier(.63,.01,.44,1)',
  },
}

const withContainer = (styles: any) =>
  merge(
    {
      marginLeft: em(theme.container.gutter),
      marginRight: em(theme.container.gutter),

      [theme.breakpoints.pageMin]: {
        marginLeft: em(theme.gutters.md),
        marginRight: em(theme.gutters.md),
      },
    },
    styles,
  )

export default theme
export { em, withContainer }
