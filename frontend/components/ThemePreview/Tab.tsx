import { css } from 'emotion'
import * as React from 'react'
import { Theme } from '../../../types/static'
import theme, { em } from '../../theme'
import { activityBarWidth } from './ActivityBar'
import { topBarHeight } from './Topbar'

interface TabProps {
  background: string
  border?: string
  borderBottom?: string
}

const Tab: React.SFC<TabProps> = ({ background, border, borderBottom }) => (
  <div
    className={classes.tab}
    style={{
      background,
      // borderLeft: border ? `1px solid ${border}` : '',
      borderRight: border ? `1px solid ${border}` : '',
      borderBottom: borderBottom ? `1px solid ${borderBottom}` : '',
    }}
  />
)

const classes = {
  tab: css({
    display: 'inline-block',
    height: '100%',
    width: '25%',
  }),
}

export default Tab
