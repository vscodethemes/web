import { css } from 'emotion'
import theme, { rem } from '../../theme'

const actions = css({
  position: 'absolute',
  bottom: rem(theme.gutters.sm),
  right: rem(theme.gutters.sm),
  opacity: 0,
  transform: 'translateY(10%)',
  transition: `opacity 0.15s ${theme.animation.bezier}, transform 0.15s ${
    theme.animation.bezier
  }`,

  [theme.breakpoints.touch]: {
    opacity: 1,
    transform: 'translateY(0%)',
  },
})

export default {
  container: css({
    width: '100%',
    boxShadow: theme.shadows.md,
    borderRadius: rem(theme.borderRadius.md),

    [`:hover .${actions}`]: {
      opacity: 1,
      transform: 'translateY(0%)',
    },
  }),

  actions,
}
