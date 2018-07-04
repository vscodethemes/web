import { css } from 'emotion'
import theme, { rem, withContainer } from '../../theme'

export default {
  wrapper: css(
    withContainer({
      marginTop: rem(theme.gutters.lg),
    }),
  ),
}
