import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'

const Container: React.SFC<{}> = ({ children }) => (
  <div className={classes.container}>{children}</div>
)

const classes = {
  container: css({
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: em(theme.header.height),

    [theme.breakpoints.pageMin]: {
      paddingTop: em(theme.header.heightCollapsed),
    },
  }),
}

export default Container
