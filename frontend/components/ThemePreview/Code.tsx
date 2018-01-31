import { css } from 'emotion'
import * as cssTemplate from 'raw-loader!./templates/css.css' // tslint:disable-line
import * as jsTemplate from 'raw-loader!./templates/js.js' // tslint:disable-line
import * as htmlTemplate from 'raw-loader!./templates/html.html' // tslint:disable-line
import * as React from 'react'
import cssLanguage from 'react-syntax-highlighter/languages/hljs/css'
import jsLanguage from 'react-syntax-highlighter/languages/hljs/javascript'
import htmlLanguage from 'react-syntax-highlighter/languages/hljs/xml'
import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/light'
import { LanguageOptions, Tokens } from '../../../types/static'
import theme, { em } from '../../theme'

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
  tokens: Tokens
}

const Code: React.SFC<CodeProps> = ({ language, tokens }) => (
  <div className={classes.code}>
    <SyntaxHighlighter language={language} style={createStyles(tokens)}>
      {templates[language]}
    </SyntaxHighlighter>
  </div>
)

const classes = {
  code: css({
    padding: em(theme.gutters.xs),
    '& pre': {
      margin: 0,
    },
    '& code': {
      fontFamily: 'Source Code Pro, monospace',
      fontSize: em(theme.fontSizes.xs),
      lineHeight: em(theme.fontSizes.xs),
    },
  }),
}

function createStyles(tokens: Tokens) {
  // Class reference: http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
  return {
    // Base
    hljs: {
      display: 'block',
      overflowX: 'auto',
      background: 'transparent',
      color: '#c0c5ce',
    },
    'hljs-emphasis': {
      fontStyle: 'italic',
    },
    'hljs-strong': {
      fontWeight: 'bold',
    },
    // Comments
    'hljs-comment': {
      color: tokens.commentForeground,
      fontStyle: tokens.commentFontStyle,
    },
    // Numbers
    'hljs-number': {
      color: tokens.numberForeground,
      fontStyle: tokens.numberFontStyle,
    },
    // Strings
    'hljs-string': {
      color: tokens.stringForeground,
      fontStyle: tokens.stringFontStyle,
    },
    'hljs-link': {
      color: tokens.stringForeground,
      fontStyle: tokens.stringFontStyle,
    },
    'hljs-quote': {
      color: tokens.stringForeground,
      fontStyle: tokens.stringFontStyle,
    },
    // Variables
    'hljs-variable': {
      color: tokens.variableForeground,
      fontStyle: tokens.variableFontStyle,
    },
    'hljs-params': {
      color: tokens.variableForeground,
      fontStyle: tokens.variableFontStyle,
    },
    'hljs-template-variable': {
      color: tokens.variableForeground,
      fontStyle: tokens.variableFontStyle,
    },
    'hljs-type': {
      color: tokens.variableForeground,
      fontStyle: tokens.variableFontStyle,
    },
    // Keywords
    'hljs-keyword': {
      color: tokens.keywordForeground,
      fontStyle: tokens.keywordFontStyle,
    },
    'hljs-built_in': {
      color: tokens.keywordForeground,
      fontStyle: tokens.keywordFontStyle,
    },
    'hljs-builtin-name': {
      color: tokens.keywordForeground,
      fontStyle: tokens.keywordFontStyle,
    },
    'hljs-symbol': {
      color: tokens.keywordForeground,
      fontStyle: tokens.keywordFontStyle,
    },
    'hljs-meta': {
      color: tokens.keywordForeground,
      fontStyle: tokens.keywordFontStyle,
    },
    // Literals
    'hljs-literal': {
      color: tokens.literalForeground,
      fontStyle: tokens.literalFontStyle,
    },
    // Classes
    'hljs-class': {
      color: tokens.classForeground,
      fontStyle: tokens.classFontStyle,
    },
    'hljs-title': {
      color: tokens.classForeground,
      fontStyle: tokens.classFontStyle,
    },
    // Functions
    'hljs-function': {
      color: tokens.functionForeground,
      fontStyle: tokens.functionFontStyle,
    },
    // HTML tags
    'hljs-tag': {
      color: tokens.tagForeground,
      fontStyle: tokens.tagFontStyle,
    },
    'hljs-name': {
      color: tokens.tagForeground,
      fontStyle: tokens.tagFontStyle,
    },
    // HTML attributes
    'hljs-attribute': {
      ccolor: tokens.attributesForeground,
      fontStyle: tokens.attributesFontStyle,
    },
    // CSS selectors
    'hljs-selector-id': {
      color: tokens.selectorForeground,
      fontStyle: tokens.selectorFontStyle,
    },
    'hljs-selector-class': {
      color: tokens.selectorForeground,
      fontStyle: tokens.selectorFontStyle,
    },
    'hljs-selector-tag': {
      color: tokens.selectorForeground,
      fontStyle: tokens.selectorFontStyle,
    },
  }
}

export default Code
