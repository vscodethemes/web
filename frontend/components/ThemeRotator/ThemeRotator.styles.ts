import { css } from 'emotion'
import theme, { rem } from '../../theme'

const size = [36, 44]

const item = css({
  position: 'relative',
  transition: `
    opacity 0.35s ${theme.animation.bezier}, 
    transform 0.35s ${theme.animation.bezier}
  `,
  transformOrigin: 'center right',
})

export default {
  wrapper: css({
    position: 'relative',
  }),

  item,

  layer: css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  }),

  button: css({
    position: 'absolute',
    top: '50%',
    right: 0,
    width: rem(size[0]),
    height: rem(size[1]),
    marginTop: rem(-size[1] / 2),
    padding: 0,
    border: 0,
    borderTopLeftRadius: rem(theme.borderRadius.sm),
    borderBottomLeftRadius: rem(theme.borderRadius.sm),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: theme.shadows.sm,
    opacity: 0,
    transform: 'scale(0.95)',
    transformOrigin: 'center right',
    transition: `
      opacity 0.15s ${theme.animation.bezier}, 
      transform 0.15s ${theme.animation.bezier}
    `,

    [`.${item}:hover &`]: {
      transform: 'scale(1)',
      opacity: 1,
    },

    ' svg': {
      height: rem(theme.fontSizes.md * 1.5),
      transform: 'scaleY(1)',
      transition: `transform 0.15s ${theme.animation.bezier}`,
    },

    ':hover svg': {
      transform: 'scaleY(1.2)',
    },

    ':active svg': {
      transform: 'scaleY(1)',
    },
  }),
}
