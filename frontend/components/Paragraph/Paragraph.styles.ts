import { css } from 'emotion'
import theme, { rem } from '../../theme'

export default {
  paragraph: css({
    fontSize: rem(theme.fontSizes.md),
    lineHeight: '1.25em',
    marginTop: 0,
    marginBottom: rem(theme.gutters.md),
    color: theme.colors.text,
  }),

  small: css({
    fontSize: rem(theme.fontSizes.sm),
  }),
}
