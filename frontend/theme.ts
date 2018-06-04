const spacingUnit = 10
export const rootFontSize = 14

export const em = (px: number) =>
  `${Math.round(px / rootFontSize * 100) / 100}em`

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
  palette: ['#00A8FF', '#B8E63B', '#E70258', '#880055', '#FAF100'],
  background: '#202026',
  backgroundDark: '#18181F',
  inputBackground: '#28282F',
  inputBorder: '#18181F',
  text: '#D4D4D4',
  textMuted: '#606066',
}

export default {
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
    pageMax: `@media (max-width: ${pageSizes.max}px)`,
    pageMin: `@media (max-width: ${pageSizes.min}px)`,
  },
  header: {
    height: 35,
    heightCollapsed: 40,
    backgroundColor: colors.inputBorder,
  },
  container: {
    gutter: gutters.lg,
  },
}
