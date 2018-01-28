import { css } from 'emotion'
import * as React from 'react'
import { Theme } from '../../../types/static'
import theme, { em } from '../../theme'
import { statusBarHeight } from './StatusBar'
import { topBarHeight } from './Topbar'

export const activityBarWidth = 10

interface ActivityBarProps {
  background: string
}

const ActivityBar: React.SFC<ActivityBarProps> = ({ background }) => (
  <div className={classes.activityBar} style={{ background }} />
)

const classes = {
  activityBar: css({
    position: 'absolute',
    top: `${topBarHeight}%`,
    left: 0,
    width: `${activityBarWidth}%`,
    height: `${100 - topBarHeight - statusBarHeight}%`,
  }),
}

export default ActivityBar
