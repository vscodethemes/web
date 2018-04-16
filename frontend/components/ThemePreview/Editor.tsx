import { Colors } from '@vscodethemes/types'
import { css } from 'emotion'
import * as React from 'react'
import { em } from '../../theme'

interface EditorProps {
  colors: Colors
}

const Editor: React.SFC<EditorProps> = ({ colors, children }) => (
  <div
    className={classes.editor}
    style={{ background: colors.editorBackground }}
  >
    {children}
  </div>
)

const classes = {
  editor: css({
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    background: '#f0f0f0',
    // Fixed aspect ratio
    paddingTop: `${100 / (16 / 10)}%`,

    [`@media (max-width: ${em(320)})`]: {
      fontSize: '0.85rem',
    },
  }),
}

export default Editor
