import { css, cx } from 'emotion'
import * as React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import theme, { em } from '../theme'

interface TabProps extends NavLinkProps {
  color: string
}

const Tab: React.SFC<TabProps> = ({ color, ...navLinkProps }) => {
  return (
    <NavLink
      {...navLinkProps}
      className={classes.link}
      activeClassName={cx(classes.active, classes.highlight(color))}
    />
  )
}

const boxWidth = 40
const boxHeight = 2

const classes = {
  link: css({
    position: 'relative',
    fontWeight: 'bold',
    letterSpacing: em(1.2),
    textDecoration: 'none',
    color: theme.colors.lightPrimary,
    paddingBottom: theme.gutters.sm,
    outline: 0,
    ':hover, :focus': {
      opacity: 1,
    },
  }),

  active: css({
    // The order that emotion adds rules is not guaranteed so we need
    // to add !important to override the non-active color. I hope there's
    // a better way.
    color: `${theme.colors.primary} !important`,
    '::after': {
      content: `''`,
      position: 'absolute',
      bottom: 0,
      left: '50%',
      marginLeft: em(-boxWidth / 2),
      height: em(boxHeight),
      width: em(boxWidth),
      borderRadius: em(boxHeight),
    },
  }),

  highlight: (color: string) => css({ '::after': { backgroundColor: color } }),
}

export default Tab
