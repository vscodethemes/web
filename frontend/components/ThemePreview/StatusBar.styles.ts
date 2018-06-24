import { css } from 'emotion'
import theme, { em } from '../../theme'

const statusBarGutter = theme.gutters.xs

export default {
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
