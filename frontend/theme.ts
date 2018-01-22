const spacingUnit = 10
export const rootFontSize = 14

export const em = (px: number) =>
  `${Math.round(px / rootFontSize * 100) / 100}em`

export default {
  fontFamily: 'Montserrat, sans-serif',
  fontSizes: {
    sm: 12,
    md: 14,
  },
  colors: {
    background: '#ffffff',
    text: '#8c8c8c',
    primary: '#00a8ff',
    lightPrimary: '#66cbff',
    gray: '#e8e8e8',
    lightGray: '#f5f5f5',
    darkGray: '#d4d4d4',
  },
  borderRadius: {
    sm: 4,
    md: 6,
  },
  spacing: {
    xs: spacingUnit / 2,
    sm: spacingUnit,
    md: spacingUnit * 2,
    lg: spacingUnit * 4,
    xl: spacingUnit * 7,
    xxl: spacingUnit * 10,
  },
  shadows: {
    sm: '0px 6px 20px rgba(0, 0, 0, 0.07)',
    md: '0px 6px 20px rgba(0, 0, 0, 0.12)',
  },
}
