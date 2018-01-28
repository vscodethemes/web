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
import { LanguageOptions } from '../../../types/static'
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
}

const Code: React.SFC<CodeProps> = ({ language }) => (
  <div className={classes.code}>
    <SyntaxHighlighter language={language} style={styles}>
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
    },
  }),
}

const styles = {
  'hljs-comment': {
    color: '#65737e',
  },
  'hljs-quote': {
    color: '#65737e',
  },
  'hljs-variable': {
    color: '#bf616a',
  },
  'hljs-template-variable': {
    color: '#bf616a',
  },
  'hljs-tag': {
    color: '#bf616a',
  },
  'hljs-name': {
    color: '#bf616a',
  },
  'hljs-selector-id': {
    color: '#bf616a',
  },
  'hljs-selector-class': {
    color: '#bf616a',
  },
  'hljs-regexp': {
    color: '#bf616a',
  },
  'hljs-deletion': {
    color: '#bf616a',
  },
  'hljs-number': {
    color: '#d08770',
  },
  'hljs-built_in': {
    color: '#d08770',
  },
  'hljs-builtin-name': {
    color: '#d08770',
  },
  'hljs-literal': {
    color: '#d08770',
  },
  'hljs-type': {
    color: '#d08770',
  },
  'hljs-params': {
    color: '#d08770',
  },
  'hljs-meta': {
    color: '#d08770',
  },
  'hljs-link': {
    color: '#d08770',
  },
  'hljs-attribute': {
    color: '#ebcb8b',
  },
  'hljs-string': {
    color: '#a3be8c',
  },
  'hljs-symbol': {
    color: '#a3be8c',
  },
  'hljs-bullet': {
    color: '#a3be8c',
  },
  'hljs-addition': {
    color: '#a3be8c',
  },
  'hljs-title': {
    color: '#8fa1b3',
  },
  'hljs-section': {
    color: '#8fa1b3',
  },
  'hljs-keyword': {
    color: '#b48ead',
  },
  'hljs-selector-tag': {
    color: '#b48ead',
  },
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
}

export default Code
