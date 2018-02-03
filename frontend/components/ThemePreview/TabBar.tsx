import { css } from 'emotion'
import * as React from 'react'
import { Colors } from '../../../types/static'
import { activityBarWidth } from './ActivityBar'
import { topBarHeight } from './TopBar'

interface TabBarProps {
  colors: Colors
}

const TabBar: React.SFC<TabBarProps> = ({ colors, children }) => (
  <div
    className={classes.tabBar}
    style={{
      background: colors.editorGroupHeaderTabsBackground,
      borderBottom: colors.editorGroupHeaderTabsBorder
        ? `1px solid ${colors.editorGroupHeaderTabsBorder}`
        : '',
    }}
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
