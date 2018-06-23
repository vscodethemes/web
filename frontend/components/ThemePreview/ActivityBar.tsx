import { Colors } from '@vscodethemes/types'
import { css, cx } from 'emotion'
import * as React from 'react'
import Icon, { Icons } from '../Icon'

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
      icon={Icons.vscodeExplorer}
      fill={colors.activityBarForeground}
    />
    <Icon
      className={classes.icon}
      icon={Icons.vscodeSearch}
      fill={colors.activityBarForeground}
    />
    <Icon
      className={classes.icon}
      icon={Icons.vscodeGit}
      fill={colors.activityBarForeground}
    />
    <Icon
      className={classes.icon}
      icon={Icons.vscodeDebug}
      fill={colors.activityBarForeground}
    />
    <Icon
      className={classes.icon}
      icon={Icons.vscodeExtensions}
      fill={colors.activityBarForeground}
    />
  </div>
)

export const activityBarWidth = 8

const classes = {
  activityBar: css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${activityBarWidth}%`,
    height: '100%',
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
