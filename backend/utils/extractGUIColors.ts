import { Colors, ThemeType } from '@vscodethemes/types'
import * as themeVariables from '../themeVariables'

export default function extractGUIColors(
  type: ThemeType,
  data: any,
): Partial<Colors> {
  const colors: any = {}

  Object.keys(themeVariables.gui).forEach(key => {
    const colorVar = themeVariables.gui[key]
    // Initially set color to the default and override
    // if we find a match.
    colors[key] = colorVar.defaults[type]
    if (data[colorVar.key]) {
      colors[key] = data[colorVar.key]
    }
  })

  return colors
}
