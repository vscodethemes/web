import { css } from 'emotion'
import theme, { em } from '../../theme'

export default {
  link: css({
    marginRight: em(theme.gutters.lg),
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.colors.palette[0],
  }),

  icon: css({
    marginTop: em(1.5),
    marginRight: em(theme.gutters.xs),
    height: em(theme.fontSizes.md * 0.9),
  }),

  text: css({
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    color: theme.colors.text,
    letterSpacing: em(-0.3),

    [theme.breakpoints.pageMin]: {
      display: 'none',
    },
  }),

  primary: css({
    fontWeight: 'normal',
    color: theme.colors.palette[0],
    letterSpacing: em(0.3),
  }),
}
