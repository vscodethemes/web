import { css } from 'emotion'
import theme, { rem } from '../../theme'

export default {
  svg: css({
    fill: 'currentColor',
    height: rem(theme.fontSizes.sm * 1.5),
  }),
}
