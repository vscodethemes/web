import { Colors, LanguageOptions } from '@vscodethemes/types'
import { css } from 'emotion'
import * as React from 'react'
import cssLanguage from 'react-syntax-highlighter/languages/prism/css'
import jsLanguage from 'react-syntax-highlighter/languages/prism/javascript'
import htmlLanguage from 'react-syntax-highlighter/languages/prism/markup'
import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/prism-light'
import theme, { em } from '../../theme'
import cssTemplate from './templates/css'
import htmlTemplate from './templates/html'
import jsTemplate from './templates/js'

registerLanguage('css', cssLanguage)
registerLanguage('html', htmlLanguage)
registerLanguage('javascript', jsLanguage)

const templates = {
  javascript: jsTemplate,
  css: cssTemplate,
  html: htmlTemplate,
}

interface CodeProps {
  language: LanguageOptions
  colors: Colors
}

const Code: React.SFC<CodeProps> = ({ language, colors }) => (
  <div className={classes.code}>
    <SyntaxHighlighter language={language} style={createStyles(colors)}>
      {templates[language]}
    </SyntaxHighlighter>
  </div>
)

const classes = {
  code: css({
    padding: em(theme.gutters.xs),
    '& pre': {
      margin: 0,
      padding: '1%',
    },
    '& code': {
      fontFamily: theme.fonts.monospace,
      fontSize: em(theme.fontSizes.xs),
      lineHeight: em(theme.fontSizes.xs),
    },
  }),
}

function createStyles(colors: Colors) {
  return {
    // Base
    'pre[class*="language-"]': {
      fontFamily: theme.fonts.monospace,
      lineHeight: '1',
      color: colors.editorForeground,
    },
    comment: {
      color: colors.commentForeground,
      fontStyle: colors.commentFontStyle,
    },
    'block-comment': {
      color: colors.commentForeground,
      fontStyle: colors.commentFontStyle,
    },
    punctuation: {
      color: colors.punctuationForeground,
      fontStyle: colors.punctuationFontStyle,
    },
    keyword: {
      color: colors.keywordForeground,
      fontStyle: colors.keywordFontStyle,
    },
    'class-name': {
      color: colors.classForeground,
      fontStyle: colors.classFontStyle,
    },
    boolean: {
      color: colors.literalForeground,
      fontStyle: colors.literalFontStyle,
    },
    constant: {
      color: colors.literalForeground,
      fontStyle: colors.literalFontStyle,
    },
    symbol: {
      color: colors.literalForeground,
      fontStyle: colors.literalFontStyle,
    },
    number: {
      color: colors.numberForeground,
      fontStyle: colors.numberFontStyle,
    },
    string: {
      color: colors.stringForeground,
      fontStyle: colors.stringFontStyle,
    },
    variable: {
      color: colors.variableForeground,
      fontStyle: colors.variableFontStyle,
    },
    operator: {
      color: colors.operatorForeground,
      fontStyle: colors.operatorFontStyle,
    },
    function: {
      color: colors.functionForeground,
      fontStyle: colors.functionFontStyle,
    },
    // html
    tag: {
      color: colors.tagForeground,
      fontStyle: colors.tagFontStyle,
    },
    'attr-name': {
      color: colors.attributeForeground,
      fontStyle: colors.attributeFontStyle,
    },
    'attr-value': {
      color: colors.attributeValueForeground,
      fontStyle: colors.attributeValueFontStyle,
    },
    // css
    property: {
      color: colors.propertyForeground,
      fontStyle: colors.propertyFontStyle,
    },
    selector: {
      color: colors.selectorForeground,
      fontStyle: colors.selectorFontStyle,
    },
  }
}

export default Code
