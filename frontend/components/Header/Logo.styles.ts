import { css } from 'emotion'
import theme, { em } from '../../theme'

export default {
  link: css({
    height: '100%',
    textDecoration: 'none',
  }),

  linkInner: css({
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    color: theme.colors.palette[0],
    ':hover': {
      textDecoration: 'underline wavy',
    },
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
