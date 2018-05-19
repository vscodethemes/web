import { LanguageOptions } from '@vscodethemes/types'
import { css } from 'emotion'
import { Html5Entities } from 'html-entities'
import * as memoize from 'mem'
import * as React from 'react'
import theme, { em } from '../../theme'
import cssTemplate from './templates/css'
import htmlTemplate from './templates/html'
import jsTemplate from './templates/js'

const templates = {
  javascript: jsTemplate,
  css: cssTemplate,
  html: htmlTemplate,
}

const entities = new Html5Entities()

function createPlaceholderHtml(code: string = '') {
  let html = ''
  const lines = code.split('\n')
  for (const line of lines) {
    if (line) {
      html += `<div>${entities.encode(line).replace(/\s/g, '&nbsp;')}</div>`
    } else {
      html += '<div><br /></div>'
    }
  }
  return html
}

const createPlaceholderHtmlMemoized = memoize(createPlaceholderHtml)

interface CodeProps {
  language: LanguageOptions
  editorForegroundColor: string
  themeId: string
}

interface CodeState {
  html: string
}

class Code extends React.Component<CodeProps, CodeState> {
  static cache: { [key: string]: string } = {}

  state = {
    html: '',
  }

  abortController?: AbortController

  async componentDidMount() {
    const { language, themeId } = this.props

    if (themeId) {
      const cacheKey = [themeId, language].join('|')
      const cacheHit = Code.cache[cacheKey]
      if (cacheHit) {
        this.setState({ html: cacheHit })
      } else {
        try {
          // let abortSignal
          // if (typeof AbortController !== 'undefined') {
          //   this.abortController = new AbortController()
          //   abortSignal = this.abortController.signal
          // }
          // TODO: fetch tokens for theme and language and generate an SVG:
          // const tokens = await getTokens(themeId, language)
          // const html = createSVG(tokens)
          // this.setState({ html })
          // Code.cache[cacheKey] = html
        } catch (err) {
          console.error(`Failed to fetch tokens for ${themeId}: ${err.message}`) // tslint:disable-line no-console
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort()
    }
  }

  render() {
    const { editorForegroundColor, language } = this.props
    const { html } = this.state
    const didTokenize = !!html

    return (
      <div
        className={classes.code}
        style={{
          color: editorForegroundColor,
          opacity: didTokenize ? 1 : 0.25,
        }}
        dangerouslySetInnerHTML={{
          __html: didTokenize
            ? html
            : createPlaceholderHtmlMemoized(templates[language]),
        }}
      />
    )
  }
}

const classes = {
  code: css({
    position: 'relative',
    height: '100%',
    padding: em(theme.gutters.sm),
    fontFamily: theme.fonts.monospace,
    fontSize: em(theme.fontSizes.xs),
    lineHeight: em(theme.fontSizes.xs),
    '> div': {
      lineHeight: 1.5,
    },
  }),
  loading: css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
}

export default Code
