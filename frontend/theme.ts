const spacingUnit = 10
export const rootFontSize = 14
export const fontFamily = 'Montserrat'

export const em = (px: number) =>
  `${Math.round(px / rootFontSize * 100) / 100}em`

export default {
  fontFamily: `${fontFamily}, sans-serif`,
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
    // inputBackground: '#f5f5f5',
    // inputBorder: '#d4d4d4',
    // text: '#8c8c8c',
    // textMuted: '#cacaca',

    // Dark theme.
    background: '#202026',
    inputBackground: '#28282F',
    inputBorder: '#18181F',
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
    sm: '0px 6px 20px rgba(0, 0, 0, 0.2)',
    md: '0px 6px 20px rgba(0, 0, 0, 0.35)',
  },
}
