import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../../theme'
import Icon from '../Icon'

export const statusBarHeight = 7

interface StatusBarProps {
  background: string
  foreground: string
  repository: string
  repositoryOwner: string
  installs: number
  rating: number
}

const StatusBar: React.SFC<StatusBarProps> = ({
  background,
  foreground,
  repository,
  repositoryOwner,
  installs,
  rating,
}) => (
  <div className={classes.statusBar} style={{ background }}>
    <a
      className={classes.link}
      href={`https://github.com/${repositoryOwner}/${repository}`}
      style={{ color: foreground }}
    >
      <img
        className={classes.pic}
        src={`https://github.com/${repositoryOwner}.png?size=40`}
      />
      <span className={classes.text}>{repositoryOwner}</span>
    </a>
    <div
      className={classes.installs}
      style={{ color: foreground }}
      title="installs"
    >
      <Icon className={classes.icon} icon="download" fill={foreground} />
      <span className={classes.text}>{formatInstalls(installs)}</span>
    </div>
  </div>
)

function formatInstalls(installs: number) {
  if (installs > 1000000) {
    return `${Math.round(installs / 1000000 * 10) / 10}m`
  }
  if (installs > 1000) {
    return `${Math.round(installs / 1000 * 10) / 10}k`
  }
  return installs
}

const classes = {
  statusBar: css({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: `${statusBarHeight}%`,
    padding: '0 2%',
    borderBottomLeftRadius: em(theme.borderRadius.md),
    borderBottomRightRadius: em(theme.borderRadius.md),
    display: 'flex',
    alignItems: 'center',
  }),

  link: css({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline wavy',
    },
  }),

  pic: css({
    width: em(theme.fontSizes.xs * 1.35),
    height: em(theme.fontSizes.xs * 1.35),
    borderRadius: '100%',
    marginRight: em(theme.gutters.xs),
    objectFit: 'cover',
  }),

  text: css({
    fontSize: theme.fontSizes.xs,
  }),

  installs: css({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }),

  icon: css({
    height: em(theme.fontSizes.xs * 1.35),
    marginRight: em(theme.gutters.xs),
  }),
}

export default StatusBar
