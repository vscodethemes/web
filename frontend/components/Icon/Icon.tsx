import { cx } from 'emotion'
import * as React from 'react'
import styles from './Icon.styles'
import icons from './icons'

export type Icons =
  | 'cart'
  | 'chevronDoubleLeft'
  | 'chevronDoubleRight'
  | 'chevronLeft'
  | 'chevronRight'
  | 'download'
  | 'github'
  | 'open'
  | 'search'
  | 'star'
  | 'twitter'
  | 'vscodeDebug'
  | 'vscodeExplorer'
  | 'vscodeExtensions'
  | 'vscodeGit'
  | 'vscodeSearch'

interface IconProps {
  icon: Icons
  className?: string
  fill?: string
}

const Icon: React.SFC<IconProps> = ({ icon, className, fill }) => (
  <svg
    className={cx(styles.svg, className)}
    viewBox={icons[icon].viewBox}
    style={{ fill }}
  >
    <path d={icons[icon].path} />
  </svg>
)

export default Icon
