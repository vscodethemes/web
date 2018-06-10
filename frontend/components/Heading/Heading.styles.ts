import { css } from 'emotion'
import theme, { em } from '../../theme'

export default {
  heading: css({
    fontSize: 'inherit',
    fontWeight: 'inherit',
    marginTop: 0,
    marginBottom: em(theme.gutters.md),
  }),
  text: css({
    color: theme.colors.text,
    fontSize: em(theme.fontSizes.xl),
    fontWeight: 'normal',
    lineHeight: '1em',
  }),
}
