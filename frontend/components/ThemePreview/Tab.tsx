import { css, cx } from 'emotion'
import * as React from 'react'
import theme, { em } from '../../theme'

interface TabProps {
  active: boolean
  border?: string
  activeBackground: string
  activeForeground: string
  activeBorder?: string
  inactiveBackground: string
  inactiveForeground: string
  inactiveBorder?: string
  onClick: () => any
}

const Tab: React.SFC<TabProps> = ({
  active,
  border,
  activeBackground,
  activeForeground,
  activeBorder,
  inactiveBackground,
  inactiveForeground,
  inactiveBorder,
  children,
  onClick,
}) => (
  <button
    className={cx(classes.tab, active && classes.active)}
    style={{
      background: active ? activeBackground : inactiveBackground,
      color: active ? activeForeground : inactiveForeground,
      borderRight: border ? `1px solid ${border}` : '',
      borderBottom: active && activeBorder ? `1px solid ${activeBorder}` : '',
    }}
    onClick={onClick}
  >
    {children}
  </button>
)

const classes = {
  tab: css({
    height: '100%',
    width: '30%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: em(theme.fontSizes.xs),
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    ':hover': {
      textDecoration: 'underline wavy',
    },
  }),

  active: css({
    cursor: 'default',
    ':hover': {
      textDecoration: 'none',
    },
  }),
}

export default Tab
