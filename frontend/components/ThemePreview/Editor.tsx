import { css } from 'emotion'
import * as React from 'react'
import { Colors } from '../../../types/static'
import theme, { em } from '../../theme'

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
    borderRadius: em(theme.borderRadius.md),
    marginBottom: em(theme.gutters.lg),
    boxShadow: theme.shadows.md,
    // Preserve a 4:3 aspect ratio.
    paddingTop: `${100 / (4 / 3)}%`,
  }),
}

export default Editor
