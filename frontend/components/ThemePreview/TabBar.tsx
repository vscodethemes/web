import { Colors } from '@vscodethemes/types'
import { css } from 'emotion'
import * as React from 'react'
import { activityBarWidth } from './ActivityBar'

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

export const tabBarHeight = 10

const classes = {
  tabBar: css({
    position: 'absolute',
    top: 0,
    left: `${activityBarWidth}%`,
    width: `${100 - activityBarWidth}%`,
    height: `${tabBarHeight}%`,
  }),
}

export default TabBar
