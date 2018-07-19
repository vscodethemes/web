import { css } from 'emotion'
import theme, { rem, withContainer } from '../../theme'

export default {
  footer: css({
    width: '100%',
    paddingTop: rem(theme.gutters.md),
    paddingBottom: rem(theme.gutters.md),
    borderTop: `1px solid ${theme.colors.inputBorder}`,
    backgroundColor: theme.colors.inputBorder,
  }),

  container: css(
    withContainer({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',

      [theme.breakpoints.mobile]: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
  ),

  links: css({
    order: 0,
    display: 'flex',
    [theme.breakpoints.mobile]: {
      order: 1,
      marginTop: rem(theme.gutters.md),
    },
  }),

  icon: css({
    marginRight: rem(theme.gutters.xs),
  }),

  link: css({
    fontSize: rem(theme.fontSizes.sm),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.colors.textMuted,
    cursor: 'pointer',
    textDecoration: 'none',

    ':first-child': {
      marginRight: rem(theme.gutters.md),
    },
    ':hover': {
      color: theme.colors.text,
    },
  }),
}
