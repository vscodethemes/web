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

const dotSize = 4

const styles = (theme: Theme) =>
  css({
    position: 'relative',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.colors.primary[500],
    opacity: 0.6,
    padding: theme.spacing.sm + dotSize,
    ':hover': { opacity: 1 },
  })

const activeStyles = (theme: Theme) =>
  css({
    opacity: 1,
    '::after': {
      content: `''`,
      position: 'absolute',
      // Compensate for bottom padding by moving the dot up
      // by the same amount.
      bottom: theme.spacing.sm - theme.spacing.xs,
      left: '50%',
      marginLeft: -dotSize / 2,
      height: dotSize,
      width: dotSize,
      borderRadius: dotSize,
      backgroundColor: theme.colors.primary[700],
    },
  })

export default withTheme(Tab) as React.ComponentClass<NavLinkProps>
