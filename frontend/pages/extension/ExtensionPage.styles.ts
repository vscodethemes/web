import { css } from 'emotion'
import theme, { rem, withContainer } from '../../theme'

export default {
  wrapper: css(
    withContainer({
      position: 'relative',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: rem(theme.gutters.lg),
      marginBottom: rem(theme.gutters.lg),
    }),
  ),
}
