// Ported from https://github.com/Microsoft/vscode-textmate/blob/master/src/main.ts#L249.
export enum MetadataConsts {
  LANGUAGEID_MASK = 255,
  TOKEN_TYPE_MASK = 1792,
  FONT_STYLE_MASK = 14336,
  FOREGROUND_MASK = 8372224,
  BACKGROUND_MASK = 4286578688,
  LANGUAGEID_OFFSET = 0,
  TOKEN_TYPE_OFFSET = 8,
  FONT_STYLE_OFFSET = 11,
  FOREGROUND_OFFSET = 14,
  BACKGROUND_OFFSET = 23,
}

// Ported from https://github.com/Microsoft/vscode/blob/45e859bfdc720da4668a2e9742039860efccfa84/src/vs/editor/common/modes.ts#L69
export enum FontStyle {
  NotSet = -1,
  None = 0,
  Italic = 1,
  Bold = 2,
  Underline = 4,
}

export enum StandardTokenType {
  Other = 0,
  Comment = 1,
  String = 2,
  RegEx = 4,
}

export enum ColorId {
  None = 0,
  DefaultForeground = 1,
  DefaultBackground = 2,
}

export interface Style {
  color?: string
  fontWeight?: string
  fontStyle?: string
  textDecoration?: string
}

// Ported from https://github.com/Microsoft/vscode-textmate/blob/master/src/grammar.ts#L897.
export default class TokenMetadata {
  static getLanguageId(metadata: number) {
    return (
      (metadata & MetadataConsts.LANGUAGEID_MASK) >>>
      MetadataConsts.LANGUAGEID_OFFSET
    )
  }

  static getTokenType(metadata: number) {
    return (
      (metadata & MetadataConsts.TOKEN_TYPE_MASK) >>>
      MetadataConsts.TOKEN_TYPE_OFFSET
    )
  }

  static getFontStyle(metadata: number) {
    return (
      (metadata & MetadataConsts.FONT_STYLE_MASK) >>>
      MetadataConsts.FONT_STYLE_OFFSET
    )
  }

  static getForeground(metadata: number) {
    return (
      (metadata & MetadataConsts.FOREGROUND_MASK) >>>
      MetadataConsts.FOREGROUND_OFFSET
    )
  }

  static getBackground(metadata: number) {
    return (
      (metadata & MetadataConsts.BACKGROUND_MASK) >>>
      MetadataConsts.BACKGROUND_OFFSET
    )
  }

  static getStyleObject(metadata: number, colorMap: string[]): Style {
    const foreground = TokenMetadata.getForeground(metadata)
    const fontStyle = TokenMetadata.getFontStyle(metadata)

    const style: Style = {}

    if (colorMap[foreground]) {
      style.color = colorMap[foreground]
    }
    if (fontStyle & FontStyle.Italic) {
      style.fontStyle = 'italic'
    }
    if (fontStyle & FontStyle.Bold) {
      style.fontWeight = 'bold'
    }
    if (fontStyle & FontStyle.Underline) {
      style.textDecoration = 'underline'
    }

    return style
  }
}
