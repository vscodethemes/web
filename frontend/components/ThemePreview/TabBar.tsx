import { css } from 'emotion'
import * as React from 'react'
import { activityBarWidth } from './ActivityBar'
import { topBarHeight } from './TopBar'

interface TabBarProps {
  background: string
  border: string
}

const TabBar: React.SFC<TabBarProps> = ({ background, border, children }) => (
  <div
    className={classes.tabBar}
    style={{ background, borderBottom: border ? `1px solid ${border}` : '' }}
  >
    {children}
  </div>
)

export const tabBarHeight = 9

const classes = {
  tabBar: css({
    position: 'absolute',
    top: `${topBarHeight}%`,
    left: `${activityBarWidth}%`,
    width: `${100 - activityBarWidth}%`,
    height: `${tabBarHeight}%`,
  }),
}

export default TabBar
