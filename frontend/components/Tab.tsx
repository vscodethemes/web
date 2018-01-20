import { css } from 'emotion'
import * as React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import theme from '../theme'

const Tab: React.SFC<NavLinkProps> = props => {
  return (
    <NavLink
      {...props}
      className={classes.link}
      activeClassName={classes.active}
    />
  )
}

const dotSize = 4

const classes = {
  link: css({
    position: 'relative',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.colors.lightPrimary,
    paddingBottom: theme.spacing.sm,
    outline: 0,
    ':hover, :focus': {
      opacity: 1,
    },
  }),

  active: css({
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
  }),
}

export default Tab
