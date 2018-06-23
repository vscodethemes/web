import { cx } from 'emotion'
import * as React from 'react'
import styles from './Tab.styles'

interface TabProps {
  color: string
  active?: boolean
  href?: string
  onClick?: (e: any) => any
}

const Tab: React.SFC<TabProps> = ({
  color,
  href,
  active = false,
  onClick,
  children,
}) => (
  <a
    className={cx(
      styles.link,
      active && styles.active,
      styles.highlight(color),
    )}
    onClick={onClick}
    href={href}
  >
    <div className={styles.text}>{children}</div>
  </a>
)

export default Tab
