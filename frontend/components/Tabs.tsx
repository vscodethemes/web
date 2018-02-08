import { css } from 'emotion'
import * as React from 'react'
import { em } from '../theme'

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
    alignItems: 'flex-end',
    maxWidth: em(210),
  }),
}

export default Tabs
