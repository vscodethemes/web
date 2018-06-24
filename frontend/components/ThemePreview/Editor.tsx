import { Colors } from '@vscodethemes/types'
import { css } from 'emotion'
import * as React from 'react'

interface EditorProps {
  colors: Colors
}

const styles = {
  editor: css({
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    background: '#f0f0f0',
    // Fixed aspect ratio
    paddingTop: `${100 / (16 / 10)}%`,
  }),
}

const Editor: React.SFC<EditorProps> = ({ colors, children }) => (
  <div
    className={styles.editor}
    style={{ background: colors.editorBackground }}
  >
    {children}
  </div>
)

export default Editor
