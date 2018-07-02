import { css } from 'emotion'
import theme, { em } from '../../theme'

export default {
  footer: css({
    width: '100%',
    borderTop: `1px solid ${theme.colors.inputBorder}`,
    padding: `${em(theme.gutters.md)} ${em(theme.container.gutter)}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    [theme.breakpoints.pageMin]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.inputBorder,
    },
  }),

  links: css({
    order: 0,
    display: 'flex',
    [theme.breakpoints.pageMin]: {
      order: 1,
      marginTop: em(theme.gutters.md),
    },
  }),

  icon: css({
    marginRight: em(theme.gutters.xs),
  }),

  link: css({
    fontSize: em(theme.fontSizes.sm),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.colors.textMuted,
    cursor: 'pointer',
    textDecoration: 'none',

    ':first-child': {
      marginRight: em(theme.gutters.md),
    },
    ':hover': {
      color: theme.colors.text,
    },
  }),
}
