import * as React from 'react'
import styles from './Header.styles'
import Logo from './Logo'

interface HeaderProps {
  onLogoClick?: () => any
}

const Header: React.SFC<HeaderProps> = ({ onLogoClick }) => (
  <div className={styles.header}>
    <Logo onClick={onLogoClick} />
  </div>
)

export default Header
