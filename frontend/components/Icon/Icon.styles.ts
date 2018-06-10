import { css } from 'emotion'
import theme, { em } from '../../theme'

export default {
  svg: css({
    fill: 'currentColor',
    height: em(theme.fontSizes.md * 1.5),
  }),
}
