import themeVariables from '@vscodethemes/theme-variables'
import { Colors, ThemeType } from '@vscodethemes/types'

const unwrap = (fn: any, ...args: any[]) => {
  if (typeof fn === 'function') {
    return fn(...args)
  }
  return fn
}

export default function withDefaultColors(
  type: ThemeType,
  colors: Colors,
): Colors {
  const withDefaults = { ...colors }

  Object.keys(themeVariables).forEach((key: keyof typeof themeVariables) => {
    const colorVar = themeVariables[key]
    if (!colors[key]) {
      withDefaults[key] = unwrap(colorVar.defaults[type], colors)
    }
  })

  return withDefaults
}
