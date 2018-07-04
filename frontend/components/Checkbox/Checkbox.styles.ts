import { css } from 'emotion'
import theme, { rem } from '../../theme'

export default {
  label: css({
    display: 'flex',
    alignItems: 'center',
    marginBottom: rem(theme.gutters.sm),
    marginRight: rem(theme.gutters.sm),
    cursor: 'pointer',

    [theme.breakpoints.pageMin]: {
      marginBottom: 0,
      marginRight: rem(theme.gutters.sm),
      minWidth: rem(100),
    },
  }),

  text: css({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    fontSize: rem(theme.fontSizes.md),
    color: theme.colors.text,
  }),

  input: css({
    margin: 0,
    marginRight: rem(theme.gutters.sm),
  }),
}
