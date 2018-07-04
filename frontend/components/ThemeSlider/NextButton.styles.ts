import { css } from 'emotion'
import createButtonStyles from './createButtonStyles'

const buttonStyles = createButtonStyles(false)

export default {
  button: css(buttonStyles.button),
  hide: css(buttonStyles.hide),
  icon: css(buttonStyles.icon),
}
