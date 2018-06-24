import { Colors } from '@vscodethemes/types'
import * as React from 'react'
import styles from './StatusBar.styles'

interface StatusBarProps {
  colors: Colors
  repository: string
  repositoryOwner: string
}

const StatusBar: React.SFC<StatusBarProps> = ({
  colors,
  repository,
  repositoryOwner,
}) => (
  <div
    className={styles.statusBar}
    style={{ background: colors.statusBarBackground }}
  >
    {repositoryOwner && (
      <a
        className={styles.link}
        href={`https://github.com/${repositoryOwner}/${repository}`}
        style={{ color: colors.statusBarForeground }}
      >
        <img
          className={styles.pic}
          src={`https://github.com/${repositoryOwner}.png?size=40`}
        />
        {repositoryOwner}
      </a>
    )}
  </div>
)

export default StatusBar
