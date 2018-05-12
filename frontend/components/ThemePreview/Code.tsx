import { LanguageOptions } from '@vscodethemes/types'
import { css } from 'emotion'
import * as React from 'react'
import * as tokenizer from '../../clients/tokenizer'
import theme, { em } from '../../theme'
import cssTemplate from './templates/css'
import htmlTemplate from './templates/html'
import jsTemplate from './templates/js'

const templates = {
  javascript: jsTemplate,
  css: cssTemplate,
  html: htmlTemplate,
}

interface CodeProps {
  language: LanguageOptions
  editorForegroundColor: string
  themeUrl: string
}

interface CodeState {
  html: string
  error: boolean
}

class Code extends React.Component<CodeProps, CodeState> {
  state = {
    html: '',
    error: false,
  }

  async componentDidMount() {
    const { language, themeUrl } = this.props
    const code = templates[language]
    if (themeUrl && code) {
      try {
        const html = await tokenizer.tokenize(themeUrl, language, code)
        if (!html) throw new Error('Empty HTML.')
        this.setState({ html })
      } catch (err) {
        console.error(`Failed to tokenize: ${err.message}`) // tslint:disable-line no-console
        this.setState({ error: true })
      }
    }
  }

  render() {
    const { editorForegroundColor } = this.props
    const { html, error } = this.state
    const isLoading = !error && (!theme || !html)

    if (isLoading) {
      return (
        <div className={classes.code} style={{ color: editorForegroundColor }}>
          <div className={classes.loading}>Loading...</div>
        </div>
      )
    }

    if (error) {
      return (
        <div
          className={classes.code}
          style={{ color: editorForegroundColor }}
        />
      )
    }

    return (
      <div
        className={classes.code}
        style={{ color: editorForegroundColor }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }
}

const classes = {
  code: css({
    position: 'relative',
    height: '100%',
    padding: em(theme.gutters.xs),
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
