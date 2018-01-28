import { css } from 'emotion'
import * as React from 'react'
import { Theme } from '../../../types/static'
import theme, { em } from '../../theme'
import { topBarHeight } from './Topbar'

export const statusBarHeight = 7

interface StatusBarProps {
  background: string
}

const StatusBar: React.SFC<StatusBarProps> = ({ background }) => (
  <div className={classes.statusBar} style={{ background }} />
)

const classes = {
  statusBar: css({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: `${statusBarHeight}%`,
    borderBottomLeftRadius: em(theme.borderRadius.md),
    borderBottomRightRadius: em(theme.borderRadius.md),
  }),
}

export default StatusBar
