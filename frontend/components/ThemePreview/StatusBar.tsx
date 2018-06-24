import { Colors } from '@vscodethemes/types'
import { css, cx } from 'emotion'
import * as React from 'react'
import theme, { em } from '../../theme'

interface StatusBarProps {
  colors: Colors
  repository: string
  repositoryOwner: string
}

const StatusBar: React.SFC<StatusBarProps> = ({
  colors,
  repository,
  repositoryOwner,
}) => (
  <div
    className={classes.statusBar}
    style={{ background: colors.statusBarBackground }}
  >
    {repositoryOwner && (
      <a
        className={classes.link}
        href={`https://github.com/${repositoryOwner}/${repository}`}
        style={{ color: colors.statusBarForeground }}
      >
        <img
          className={classes.pic}
          src={`https://github.com/${repositoryOwner}.png?size=40`}
        />
        {repositoryOwner}
      </a>
    )}
  </div>
)

const statusBarGutter = theme.gutters.xs

const classes = {
  statusBar: css({
    height: `${em(theme.fontSizes.xs + statusBarGutter * 2)}`,
    borderBottomLeftRadius: em(theme.borderRadius.md),
    borderBottomRightRadius: em(theme.borderRadius.md),
    display: 'flex',
    alignItems: 'center',
  }),

  link: css({
    // flex: 1,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.xs,
    height: '100%',
  }),

  pic: css({
    width: em(theme.fontSizes.xs * 2),
    height: em(theme.fontSizes.xs * 2),
    marginLeft: em(theme.gutters.sm),
    marginRight: em(theme.gutters.xs),
    objectFit: 'cover',
    borderRadius: '100%',
  }),

  secondary: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }),

  icon: css({
    height: em(theme.fontSizes.xs * 1.75),
    marginLeft: em(theme.gutters.xs),
    marginRight: `${statusBarGutter}%`,
  }),
}

export default StatusBar
