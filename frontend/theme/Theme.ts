import Colors from './colors/Colors'

export default interface Theme {
  rootFontSize: number
  fontFamily: string
  pageWidth: number
  formWidth: number
  colors: {
    primary: Colors
  }
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    xxl: number
  }
}
