import { css } from 'emotion'
import * as React from 'react'
import { activityBarWidth } from './ActivityBar.styles'
import { tabBarHeight } from './TabBar'

const styles = {
  tabContent: css({
    position: 'absolute',
    top: `${tabBarHeight}%`,
    left: `${activityBarWidth}%`,
    width: `${100 - activityBarWidth}%`,
    height: `${100 - tabBarHeight}%`,
    boxShadow: `inset 1px 1px 2px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(0,0,0,0.1)`,
    overflow: 'hidden',
  }),
}

const TabContent: React.SFC<{}> = ({ children }) => (
  <div className={styles.tabContent}>{children}</div>
)

export default TabContent
