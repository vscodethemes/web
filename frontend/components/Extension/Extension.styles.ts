import { css } from 'emotion'
import theme, { rem } from '../../theme'

const maxPreviewWidth = 440

export default {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.mobile]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),

  preview: css({
    width: '100%',
    maxWidth: rem(maxPreviewWidth),
    marginRight: rem(theme.gutters.lg),

    [theme.breakpoints.mobile]: {
      marginRight: 0,
      marginBottom: rem(theme.gutters.lg),
    },
  }),

  info: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    maxWidth: rem(maxPreviewWidth),
  }),

  owner: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(-theme.gutters.md + theme.gutters.xs),
    marginRight: rem(theme.gutters.md),
    marginBottom: rem(theme.gutters.md),
    fontSize: rem(theme.fontSizes.sm),
    color: theme.colors.textMuted,
  }),

  actions: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(theme.gutters.sm),
  }),

  install: css({
    marginRight: rem(theme.gutters.md),
  }),

  link: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: rem(theme.gutters.sm),
    color: theme.colors.textMuted,

    ':hover': {
      color: theme.colors.text,
    },
    ':first-child': {
      marginRight: 0,
    },
  }),
}
