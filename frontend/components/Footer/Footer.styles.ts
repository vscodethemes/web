import { css } from 'emotion'
import theme, { rem } from '../../theme'

export default {
  footer: css({
    width: '100%',
    borderTop: `1px solid ${theme.colors.inputBorder}`,
    padding: `${rem(theme.gutters.md)} ${rem(theme.container.gutter)}`,
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
