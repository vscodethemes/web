import { css } from 'emotion'
import theme, { em, withContainer } from '../../theme'

export default {
  wrapper: css(
    withContainer({
      marginTop: em(theme.gutters.lg),
    }),
  ),
}
