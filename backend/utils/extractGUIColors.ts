import themeVariables from '@vscodethemes/theme-variables'
import { Colors, ThemeType } from '@vscodethemes/types'

export default function extractGUIColors(
  type: ThemeType,
  data: any,
): Partial<Colors> {
  const colors: any = {}

  Object.keys(themeVariables).forEach((key: keyof typeof themeVariables) => {
    const colorVar = themeVariables[key]
    if (data[colorVar.key]) {
      colors[key] = data[colorVar.key]
    }
  })

  return colors
}
