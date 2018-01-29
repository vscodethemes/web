import { css } from 'emotion'
import * as React from 'react'
import { activityBarWidth } from './ActivityBar'
import { statusBarHeight } from './StatusBar'
import { tabBarHeight } from './TabBar'
import { topBarHeight } from './TopBar'

const TabContent: React.SFC<{}> = ({ children }) => (
  <div className={classes.tabContent}>{children}</div>
)

const classes = {
  tabContent: css({
    position: 'absolute',
    top: `${topBarHeight + tabBarHeight}%`,
    left: `${activityBarWidth}%`,
    width: `${100 - activityBarWidth}%`,
    height: `${100 - topBarHeight - tabBarHeight - statusBarHeight}%`,
    boxShadow: `inset 1px 1px 2px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(0,0,0,0.1)`,
    overflow: 'auto',
  }),
}

export default TabContent
