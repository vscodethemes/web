import { css } from 'emotion'
import theme, { rem } from '../../theme'

export default {
  item: css({
    display: 'block',
    fontSize: rem(theme.fontSizes.sm),
    color: theme.colors.text,
    backgroundColor: theme.colors.backgroundInverse,
    padding: `${rem(theme.gutters.sm)} ${rem(theme.gutters.md)}`,
    border: 0,
    outline: 0,
    cursor: 'pointer',
    textDecoration: 'none',

    '&:hover': {
      backgroundColor: theme.colors.backgroundDark,
    },
    '&:first-child': {
      borderTopLeftRadius: theme.borderRadius.sm,
      borderTopRightRadius: theme.borderRadius.sm,
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.borderRadius.sm,
      borderBottomRightRadius: theme.borderRadius.sm,
    },
  }),
}
