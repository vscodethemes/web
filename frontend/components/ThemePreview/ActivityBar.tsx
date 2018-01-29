import { css } from 'emotion'
import * as React from 'react'
import Icon from '../Icon'
import { statusBarHeight } from './StatusBar'
import { topBarHeight } from './TopBar'

export const activityBarWidth = 9

interface ActivityBarProps {
  background: string
  foreground: string
}

const ActivityBar: React.SFC<ActivityBarProps> = ({
  background,
  foreground,
}) => (
  <div className={classes.activityBar} style={{ background }}>
    <Icon className={classes.icon} icon="vscodeExplorer" fill={foreground} />
    <Icon className={classes.icon} icon="vscodeSearch" fill={foreground} />
    <Icon className={classes.icon} icon="vscodeGit" fill={foreground} />
    <Icon className={classes.icon} icon="vscodeDebug" fill={foreground} />
    <Icon className={classes.icon} icon="vscodeExtensions" fill={foreground} />
  </div>
)

const classes = {
  activityBar: css({
    position: 'absolute',
    top: `${topBarHeight}%`,
    left: 0,
    width: `${activityBarWidth}%`,
    height: `${100 - topBarHeight - statusBarHeight}%`,
    paddingTop: '1%',
  }),

  icon: css({
    width: '100%',
    height: '8%',
    margin: '10% 0',
    opacity: 0.75,
  }),
}

export default ActivityBar
