import { css } from 'emotion'
import theme, { em } from '../../theme'
import createButtonStyles from './createButtonStyles'

const buttonStyles = createButtonStyles(true)

export default {
  button: css(buttonStyles.button),
  hide: css(buttonStyles.hide),
  icon: css(buttonStyles.icon),
}
