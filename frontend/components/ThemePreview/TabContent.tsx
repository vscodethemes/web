import { css } from 'emotion'
import * as React from 'react'
import { Theme } from '../../../types/static'
import theme, { em } from '../../theme'
import { activityBarWidth } from './ActivityBar'
import { statusBarHeight } from './StatusBar'
import { tabBarHeight } from './TabBar'
import { topBarHeight } from './Topbar'

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
    boxShadow: `inset 0px 1px 2px rgba(0,0,0,0.1)`,
    overflow: 'auto',
  }),
}

export default TabContent
