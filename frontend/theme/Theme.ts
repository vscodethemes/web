export default interface Theme {
  fontFamily: string
  fontSizes: {
    sm: number
    md: number
  }
  colors: {
    background: string
    text: string
    primary: string
    lightPrimary: string
    gray: string
    lightGray: string
    darkGray: string
  }
  borderRadius: {
    sm: number
    md: number
  }
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    xxl: number
  }
  shadows: {
    sm: string
    md: string
  }
}
