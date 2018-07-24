const spacingUnit = 10
export const rootFontSize = 14

const gutters = {
  xs: spacingUnit / 2,
  sm: spacingUnit,
  md: spacingUnit * 2,
  lg: spacingUnit * 4,
  xl: spacingUnit * 7,
}

const colors = {
  palette: ['#00A8FF', '#B8E63B', '#880055', '#E70258', '#FAF100'],
  background: '#202026',
  backgroundDark: '#18181F',
  backgroundInverse: 'rgba(0, 0, 0, 0.8)',
  inputBackground: '#28282F',
  inputBorder: '#18181F',
  text: '#D4D4D4',
  textMuted: '#606066',
  textInverse: '#fff',
}

const rem = (px: number) => `${Math.round((px / rootFontSize) * 100) / 100}rem`

const theme = {
  colors,
  gutters,
  fonts: {
    sansSerif:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif',
    monospace:
      '"SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace',
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 16,
    xl: 28,
  },
  borderRadius: {
    xs: 2,
    sm: 4,
    md: 6,
    round: 100,
  },
  shadows: {
    sm: '0px 6px 20px rgba(0, 0, 0, 0.2)',
    md: '0px 6px 20px rgba(0, 0, 0, 0.35)',
  },
  breakpoints: {
    mobile: `@media (max-width: ${rem(640)})`,
    touch: '@media (hover: none)',
  },
  header: {
    height: 40,
  },
  animation: {
    bezier: 'cubic-bezier(.63,.01,.44,1)',
  },
}

const withContainer = (styles: any) => ({
  marginLeft: rem(theme.gutters.lg),
  marginRight: rem(theme.gutters.lg),
  ...styles,

  [theme.breakpoints.mobile]: {
    marginLeft: rem(theme.gutters.md),
    marginRight: rem(theme.gutters.md),
    ...styles[theme.breakpoints.mobile],
  },
})

export default theme
export { rem, withContainer }
