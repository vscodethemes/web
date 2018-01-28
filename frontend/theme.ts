const spacingUnit = 10
export const rootFontSize = 14

export const em = (px: number) =>
  `${Math.round(px / rootFontSize * 100) / 100}em`

export default {
  fontFamily: 'Montserrat, sans-serif',
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
  },
  colors: {
    primary: '#00a8ff',
    lightPrimary: '#66cbff',

    // Light theme.
    // background: '#ffffff',
    // backgroundHighlight: '#f5f5f5',
    // backgroundLowlight: '#d4d4d4',
    // text: '#8c8c8c',
    // textMuted: '#cacaca',

    // Dark theme.
    background: '#202026',
    backgroundHighlight: '#28282F',
    backgroundLowlight: '#18181F',
    text: '#84848F',
    textMuted: '#58585F',
  },
  borderRadius: {
    sm: 4,
    md: 6,
  },
  gutters: {
    xs: spacingUnit / 2,
    sm: spacingUnit,
    md: spacingUnit * 2,
    lg: spacingUnit * 4,
    xl: spacingUnit * 7,
  },
  shadows: {
    sm: '0px 6px 20px rgba(0, 0, 0, 0.1)',
    md: '0px 6px 20px rgba(0, 0, 0, 0.25)',
  },
}
