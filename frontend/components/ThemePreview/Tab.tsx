import { Colors } from '@vscodethemes/types'
import { css, cx } from 'emotion'
import * as React from 'react'
import theme, { em } from '../../theme'

interface TabProps {
  colors: Colors
  active: boolean
  onClick: () => any
}

const styles = {
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
    outline: 0,
  }),

  active: css({
    cursor: 'default',
    ':hover': {
      textDecoration: 'none',
    },
  }),
}

const Tab: React.SFC<TabProps> = ({ colors, active, children, onClick }) => (
  <button
    className={cx(styles.tab, active && styles.active)}
    style={{
      background: active
        ? colors.tabActiveBackground
        : colors.tabInactiveBackground,
      color: active ? colors.tabActiveForeground : colors.tabInactiveForeground,
      borderRight: colors.tabBorder ? `1px solid ${colors.tabBorder}` : '',
      borderBottom:
        active && colors.tabActiveBorder
          ? `1px solid ${colors.tabActiveBorder}`
          : '',
    }}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Tab
