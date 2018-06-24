import { Colors } from '@vscodethemes/types'
import { css } from 'emotion'
import * as React from 'react'
import { activityBarWidth } from './ActivityBar.styles'

interface TabBarProps {
  colors: Colors
}

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

export default TabBar
