import blue from './colors/blue'
import Theme from './Theme'

const spacingUnit = 10

const theme: Theme = {
  rootFontSize: 14,
  fontFamily: 'Montserrat, sans-serif',
  pageWidth: 840,
  formWidth: 280,
  colors: {
    primary: blue,
  },
  spacing: {
    xs: spacingUnit / 2,
    sm: spacingUnit,
    md: spacingUnit * 2,
    lg: spacingUnit * 4,
    xl: spacingUnit * 7,
    xxl: spacingUnit * 10,
  },
}

export default theme
export { default as Theme } from './Theme'
