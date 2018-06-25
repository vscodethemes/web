import { LineToken } from '@vscodethemes/tokenizer'
import { css } from 'emotion'
import { Html5Entities } from 'html-entities'
import * as React from 'react'
import theme, { em } from '../../theme'

interface CodeProps {
  tokens: LineToken[][]
  editorForeground: string
}

const styles = {
  code: css({
    position: 'relative',
    height: '100%',
    padding: em(theme.gutters.sm),
    fontFamily: theme.fonts.monospace,
  }),
}

const entities = new Html5Entities()

const viewbox = [354, 200]
const fontSize = 10
const lineHeight = 14.5

const Code: React.SFC<CodeProps> = ({ tokens, editorForeground }) => {
  const texts: React.ReactNode[] = []

  tokens.forEach((lineTokens, lineIndex) => {
    const tspans: React.ReactNode[] = []

    lineTokens.forEach((styleToken, tokenIndex) => {
      if (!styleToken.token) {
        return
      }

      const style: any = {
        ...styleToken.style,
        fontSize,
        // This is a hack to fix #000000 set as the default color by vscode-textmate
        // when a theme doesn't provide a value. Since #000000 is unlikely to be
        // explicitly used, switch it to the editor foreground color.
        fill:
          styleToken.style.color === '#000000'
            ? editorForeground
            : styleToken.style.color,
      }

      tspans.push(
        <tspan
          key={tokenIndex}
          style={style}
          dangerouslySetInnerHTML={{
            __html: entities.encode(styleToken.token).replace(/\s/g, '&nbsp;'),
          }}
        />,
      )
    })

    texts.push(
      <text
        key={lineIndex}
        x={0}
        y={lineIndex * lineHeight}
        dominantBaseline="text-before-edge"
      >
        {tspans}
      </text>,
    )
  })

  return (
    <svg className={styles.code} viewBox={`0 0 ${viewbox[0]} ${viewbox[1]}`}>
      {texts}
    </svg>
  )
}

export default Code
