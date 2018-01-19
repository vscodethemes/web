import { withTheme } from 'emotion-theming'
import * as React from 'react'
import { css } from 'react-emotion'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { Theme, ThemeProps } from '../theme'

const Tab = ({ theme, ...navLinkProps }: ThemeProps & NavLinkProps) => {
  return (
    <NavLink
      {...navLinkProps}
      className={styles(theme)}
      activeClassName={activeStyles(theme)}
    />
  )
}

const dotSize = 4

const styles = (theme: Theme) =>
  css({
    position: 'relative',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.colors.lightPrimary,
    paddingBottom: theme.spacing.sm,
    outline: 0,
    ':hover, :focus': { opacity: 1 },
  })

const activeStyles = (theme: Theme) =>
  css({
    color: theme.colors.primary,
    '::after': {
      content: `''`,
      position: 'absolute',
      bottom: 0,
      left: '50%',
      marginLeft: -dotSize / 2,
      height: dotSize,
      width: dotSize,
      borderRadius: dotSize,
      backgroundColor: theme.colors.primary,
    },
  })

export default withTheme(Tab) as React.ComponentClass<NavLinkProps>
