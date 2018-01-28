import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../../theme'

export const topBarHeight = 7

export interface TopBarProps {
  name: string
  type: string
}

const TopBar: React.SFC<TopBarProps> = ({ name, type }) => (
  <div
    className={classes.topBar}
    style={{
      background: type === 'light' ? '#e8e8e8' : '#303030',
    }}
  >
    <h1
      className={classes.name}
      style={{
        color: type === 'light' ? '#303030' : '#e8e8e8',
      }}
    >
      {name}
    </h1>
  </div>
)

const classes = {
  topBar: css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: `${topBarHeight}%`,
    borderTopLeftRadius: em(theme.borderRadius.md),
    borderTopRightRadius: em(theme.borderRadius.md),
    boxShadow: '0px 1px 1px rgba(0,0,0,0.1)',
    zIndex: 10,
  }),

  name: css({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: em(theme.fontSizes.xs),
    fontWeight: 'normal',
    margin: 0,
  }),
}

export default TopBar
