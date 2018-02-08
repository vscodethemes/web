import { css, cx } from 'emotion'
import * as React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import theme, { em } from '../theme'

interface TabProps extends NavLinkProps {
  color: string
}

const Tab: React.SFC<TabProps> = ({ color, children, ...navLinkProps }) => {
  return (
    <NavLink
      {...navLinkProps}
      className={classes.link}
      activeClassName={cx(classes.active, classes.highlight(color))}
    >
      <span className={classes.text}>{children}</span>
    </NavLink>
  )
}

const boxWidth = 36
const boxHeight = 2

const classes = {
  link: css({
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: em(boxHeight),
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.colors.text,
    outline: 0,
    ':hover, :focus': {
      color: `${theme.colors.palette[0]}`,
    },
  }),

  text: css({
    fontSize: em(theme.fontSizes.md),
  }),

  active: css({
    // The order that emotion adds rules is not guaranteed so we need
    // to add !important to override the non-active color. I hope there's
    // a better way.
    color: `${theme.colors.palette[0]} !important`,
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
