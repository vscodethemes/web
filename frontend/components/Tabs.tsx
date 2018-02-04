import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'
import { collapseWidth } from './App.styles'

const Tabs: React.SFC<{}> = ({ children }) => (
  <div className={classes.tabs}>{children}</div>
)

const classes = {
  tabs: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.gutters.md,
    maxWidth: em(210),

    [`@media (max-width: ${collapseWidth}px)`]: {
      marginBottom: 0,
      maxWidth: em(250),
    },
  }),
}

export default Tabs
