import { Colors } from '@vscodethemes/types'
import * as React from 'react'
import { Icon, Icons } from '../'
import styles from './StatusBar.styles'

interface StatusBarProps {
  colors: Colors
  installs: number
}

const ONE_MILLION = 1000000
const ONE_THOUSAND = 1000

const round = (num: number) => {
  const presicion = num <= 10 ? 1 : 0
  return presicion
    ? Math.round(num * (presicion * 10)) / (presicion * 10)
    : Math.round(num)
}

const formatNumber = (num: number) => {
  if (num > ONE_MILLION) {
    return `${round(num / ONE_MILLION)}M`
  } else if (num > ONE_THOUSAND) {
    return `${round(num / ONE_THOUSAND)}K`
  }
  return round(num)
}

const StatusBar: React.SFC<StatusBarProps> = ({ colors, installs }) => (
  <div
    className={styles.statusBar}
    style={{
      background: colors.statusBarBackground,
      color: colors.statusBarForeground,
    }}
  >
    <span className={styles.stat}>
      <Icon icon={Icons.download} />
      {formatNumber(installs)}
    </span>
  </div>
)

export default StatusBar
