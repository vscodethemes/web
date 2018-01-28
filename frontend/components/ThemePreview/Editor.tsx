import { css } from 'emotion'
import * as React from 'react'
import { Theme } from '../../../types/static'
import theme, { em } from '../../theme'

interface EditorProps {
  background: string
}

const Editor: React.SFC<EditorProps> = ({ background, children }) => (
  <div className={classes.editor} style={{ background }}>
    {children}
  </div>
)

const topBarHeight = 7
const activityBarWidth = 10

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
