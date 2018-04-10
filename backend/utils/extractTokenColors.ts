import { Colors } from '@vscodethemes/types'
import * as themeVariables from '../themeVariables'

export default function extractTokenColors(
  editorForeground: string,
  data: any,
): Partial<Colors> {
  const colors: any = {}

  Object.keys(themeVariables.tokens).forEach(key => {
    const tokenVar = themeVariables.tokens[key]
    const foregroundKey = `${key}Foreground`
    const fontStyleKey = `${key}FontStyle`
    // Check if one of the scopes matches anything in tokenColors.
    // The first match wins.
    for (const scope of tokenVar.scope) {
      // Ensure tokenColors is defined and an array.
      if (Array.isArray(data)) {
        for (const token of data) {
          // Tokens in tokenColors can have multiple scopes defined as an array
          // or a string delimited by ',' or a single scope defined as a string.
          let scopes = []
          if (typeof token.scope === 'string') {
            scopes = token.scope.split(',')
          } else if (Array.isArray(token.scope)) {
            scopes = token.scope
          }

          if (
            scopes.indexOf(scope) >= 0 &&
            token.settings &&
            typeof token.settings === 'object'
          ) {
            // We found a matching token with a valid structure, set the color
            // and font style if they aren't already.
            if (!colors[foregroundKey]) {
              colors[foregroundKey] = token.settings.foreground
            }
            if (!colors[fontStyleKey]) {
              colors[fontStyleKey] = token.settings.fontStyle
            }
          }
        }
      }
    }
    // Set to default if a match wasn't found.
    if (!colors[foregroundKey]) {
      colors[foregroundKey] = editorForeground
    }
    if (!colors[fontStyleKey]) {
      colors[fontStyleKey] = 'normal'
    }
  })

  return colors
}
