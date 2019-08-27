import { cx } from 'emotion'
import * as React from 'react'
import styles from './Icon.styles'
import icons, { Icons } from './icons'

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
    <path fillRule={icons[icon].fillRule} d={icons[icon].path} />
  </svg>
)

export { Icons }
export default Icon
