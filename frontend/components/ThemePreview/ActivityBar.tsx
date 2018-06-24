import { Colors } from '@vscodethemes/types'
import { css, cx } from 'emotion'
import * as React from 'react'
import Icon, { Icons } from '../Icon'
import styles from './ActivityBar.styles'

interface ActivityBarProps {
  colors: Colors
}

const ActivityBar: React.SFC<ActivityBarProps> = ({ colors }) => (
  <div
    className={styles.activityBar}
    style={{ background: colors.activityBarBackground }}
  >
    <Icon
      className={cx(styles.icon, styles.active)}
      icon={Icons.vscodeExplorer}
      fill={colors.activityBarForeground}
    />
    <Icon
      className={styles.icon}
      icon={Icons.vscodeSearch}
      fill={colors.activityBarForeground}
    />
    <Icon
      className={styles.icon}
      icon={Icons.vscodeGit}
      fill={colors.activityBarForeground}
    />
    <Icon
      className={styles.icon}
      icon={Icons.vscodeDebug}
      fill={colors.activityBarForeground}
    />
    <Icon
      className={styles.icon}
      icon={Icons.vscodeExtensions}
      fill={colors.activityBarForeground}
    />
  </div>
)

export default ActivityBar
