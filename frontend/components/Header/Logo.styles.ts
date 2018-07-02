import { css } from 'emotion'
import theme, { rem } from '../../theme'

export default {
  link: css({
    marginRight: rem(theme.gutters.lg),
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.colors.palette[0],
  }),

  icon: css({
    marginTop: rem(1.5),
    marginRight: rem(theme.gutters.xs),
    height: rem(theme.fontSizes.sm),
  }),

  text: css({
    fontSize: rem(theme.fontSizes.sm),
    fontWeight: 'bold',
    color: theme.colors.text,
    letterSpacing: rem(-0.3),

    [theme.breakpoints.pageMin]: {
      display: 'none',
    },
  }),

  primary: css({
    fontWeight: 'normal',
    color: theme.colors.palette[0],
    letterSpacing: rem(0.3),
  }),
}
