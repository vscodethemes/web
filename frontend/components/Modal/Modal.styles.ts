import { css, keyframes } from 'emotion'
import theme from '../../theme'

const scaleIn = keyframes({
  from: {
    transform: 'scale(0.95) translateY(2%)',
  },
  to: {
    transform: 'scale(1) translateY(0%)',
  },
})

export default {
  modal: css({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${theme.colors.backgroundDark}F0`,
  }),

  contents: css({
    width: '100%',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    animation: `${scaleIn} 0.15s ${theme.animation.bezier}`,
  }),
}
