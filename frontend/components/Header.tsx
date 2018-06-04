import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'
import Logo from './Logo'

interface HeaderProps {
  onLogoClick?: () => any
}

const Header: React.SFC<HeaderProps> = ({ onLogoClick }) => (
  <div className={classes.header}>
    <Logo onClick={onLogoClick} />
  </div>
)

const classes = {
  header: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: em(theme.header.height),
    padding: `0 ${em(theme.container.gutter)}`,
    backgroundColor: `${theme.header.backgroundColor}F5`, // FA = 96% transparency for 8-digit hex value.
    zIndex: 100,

    [theme.breakpoints.pageMin]: {
      height: em(theme.header.heightCollapsed),
      backgroundColor: `${theme.header.backgroundColor}F5`,
    },
  }),
}

export default Header
