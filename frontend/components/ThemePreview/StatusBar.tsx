import { css, cx } from 'emotion'
import * as React from 'react'
import theme, { em } from '../../theme'
import Icon from '../Icon'

interface StatusBarProps {
  background: string
  foreground: string
  repository: string
  repositoryOwner: string
  extensionName: string
  publisherName: string
}

const StatusBar: React.SFC<StatusBarProps> = ({
  background,
  foreground,
  repository,
  repositoryOwner,
  extensionName,
  publisherName,
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
      {repositoryOwner}
    </a>
    {/* TODO: Link to market place for non-desktop OSs */}
    <a
      className={cx(classes.link, classes.secondary)}
      href={`vscode:extension/${publisherName}.${extensionName}`}
      style={{ color: foreground }}
    >
      Open in VSCode
      <Icon className={classes.icon} icon="open" fill={foreground} />
    </a>
  </div>
)

export const statusBarHeight = 7
const statusBarGutter = 4

const classes = {
  statusBar: css({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: `${statusBarHeight}%`,
    borderBottomLeftRadius: em(theme.borderRadius.md),
    borderBottomRightRadius: em(theme.borderRadius.md),
    display: 'flex',
    alignItems: 'center',
  }),

  link: css({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.xs,
    height: '100%',
    ':hover': {
      textDecoration: 'underline wavy',
      opacity: 1,
    },
  }),

  pic: css({
    width: em(theme.fontSizes.xs * 2),
    height: em(theme.fontSizes.xs * 2),
    marginLeft: `${statusBarGutter}%`,
    marginRight: em(theme.gutters.xs),
    objectFit: 'cover',
    borderRadius: '100%',
  }),

  secondary: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    opacity: 0.75,
  }),

  icon: css({
    height: em(theme.fontSizes.xs * 1.75),
    marginLeft: em(theme.gutters.xs),
    marginRight: `${statusBarGutter}%`,
  }),
}

export default StatusBar
