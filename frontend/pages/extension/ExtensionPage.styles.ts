import { css } from 'emotion'
import theme, { rem, withContainer } from '../../theme'

export default {
  wrapper: css(
    withContainer({
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: rem(theme.gutters.lg),
      marginBottom: rem(theme.gutters.lg),
    }),
  ),

  preview: css({
    width: '100%',
    maxWidth: 400,
    marginRight: rem(theme.gutters.lg),
  }),

  info: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: rem(450),
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
