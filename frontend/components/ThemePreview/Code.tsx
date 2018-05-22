import { LineToken } from '@vscodethemes/tokenizer'
import { css } from 'emotion'
import { Html5Entities } from 'html-entities'
import * as React from 'react'
import theme, { em } from '../../theme'

interface CodeProps {
  tokens: LineToken[][]
  editorForeground: string
}

const entities = new Html5Entities()

const Code: React.SFC<CodeProps> = ({ tokens, editorForeground }) => (
  <div className={classes.code}>
    {tokens.map((lineTokens, i) => (
      <div key={i}>
        {lineTokens.map((styleToken, j) => {
          if (!styleToken.token) {
            return <br key={j} />
          }

          // This is a hack to fix #000000 set as the default color by vscode-textmate
          // when a theme doesn't provide a value. Since #000000 is unlikely to be
          // explicitly used, switch it to the editor foreground color.
          const color =
            styleToken.style.color === '#000000'
              ? editorForeground
              : styleToken.style.color

          const style: any = {
            ...styleToken.style,
            color,
          }

          return (
            <span
              key={j}
              style={style}
              dangerouslySetInnerHTML={{
                __html: entities
                  .encode(styleToken.token)
                  .replace(/\s/g, '&nbsp;'),
              }}
            />
          )
        })}
      </div>
    ))}
  </div>
)

const classes = {
  code: css({
    position: 'relative',
    height: '100%',
    padding: em(theme.gutters.sm),
    fontFamily: theme.fonts.monospace,
    fontSize: em(theme.fontSizes.xs),
    lineHeight: 1.5,
  }),
}

export default Code
