import { css } from 'emotion'
import * as React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import theme from '../theme'

const Tab = (props: NavLinkProps) => {
  return (
    <NavLink {...props} className={styles} activeClassName={activeStyles} />
  )
}

const dotSize = 4

const styles = css({
  position: 'relative',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: theme.colors.lightPrimary,
  paddingBottom: theme.spacing.sm,
  outline: 0,
  ':hover, :focus': { opacity: 1 },
})

const activeStyles = css({
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

export default Tab
