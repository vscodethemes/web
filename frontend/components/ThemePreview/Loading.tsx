import { css } from 'emotion'
import * as React from 'react'
import theme from '../../theme'

const Loading: React.SFC<{}> = () => (
  <div className={classes.loading}>
    <span className={classes.text}>Loading...</span>
  </div>
)

const classes = {
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

  text: css({
    color: theme.colors.textMuted,
    fontSize: theme.fontSizes.xs,
    fontFamily: theme.fonts.monospace,
  }),
}

export default Loading
