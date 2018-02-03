import { css, cx } from 'emotion'
import * as React from 'react'
import { Colors } from '../../../types/static'
import Icon from '../Icon'
import { statusBarHeight } from './StatusBar'
import { topBarHeight } from './TopBar'

interface ActivityBarProps {
  colors: Colors
}

const ActivityBar: React.SFC<ActivityBarProps> = ({ colors }) => (
  <div
    className={classes.activityBar}
    style={{ background: colors.activityBarBackground }}
  >
    <Icon
      className={cx(classes.icon, classes.active)}
      icon="vscodeExplorer"
      fill={colors.activityBarForeground}
    />
    <Icon
      className={classes.icon}
      icon="vscodeSearch"
      fill={colors.activityBarForeground}
    />
    <Icon
      className={classes.icon}
      icon="vscodeGit"
      fill={colors.activityBarForeground}
    />
    <Icon
      className={classes.icon}
      icon="vscodeDebug"
      fill={colors.activityBarForeground}
    />
    <Icon
      className={classes.icon}
      icon="vscodeExtensions"
      fill={colors.activityBarForeground}
    />
  </div>
)

export const activityBarWidth = 9

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
    margin: '12% 0',
    opacity: 0.5,
  }),

  active: css({
    opacity: 1,
  }),
}

export default ActivityBar
