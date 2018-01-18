import { withTheme } from 'emotion-theming'
import * as React from 'react'
import { css } from 'react-emotion'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { Theme } from '../theme'

const Tab = ({ theme, ...props }: NavLinkProps & { theme: Theme }) => {
  return (
    <NavLink
      {...props}
      className={styles(theme)}
      activeClassName={activeStyles(theme)}
    />
  )
}

const styles = (theme: Theme) =>
  css({
    position: 'relative',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.colors.primary[500],
    opacity: 0.6,
    ':hover': { opacity: 1 },
  })

const activeStyles = (theme: Theme) =>
  css({
    opacity: 1,
    '::after': {
      content: `''`,
      position: 'absolute',
      bottom: -theme.spacing.sm,
      left: '50%',
      marginLeft: -2,
      height: 4,
      width: 4,
      borderRadius: 4,
      backgroundColor: theme.colors.primary[700],
    },
  })

export default withTheme(Tab) as React.ComponentClass<NavLinkProps>
