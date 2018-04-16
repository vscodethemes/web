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
    padding: `0 ${em(theme.container.gutter)}`,
    paddingTop: em(theme.header.height),
    maxWidth: em(theme.pageSizes.max),
    margin: '0 auto',

    [theme.breakpoints.pageMin]: {
      paddingTop: em(theme.header.heightCollapsed),
    },
  }),
}

export default Container
