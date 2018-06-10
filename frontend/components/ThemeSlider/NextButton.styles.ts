import { css } from 'emotion'
import theme, { em } from '../../theme'

const shadowSize = 30
const sliderBtnSize = [64, 128]
const sliderBtnOffset = theme.gutters.md

export default {
  button: css({
    opacity: 0,
    position: 'absolute',
    fontSize: 'inherit',
    right: 0,
    top: '50%',
    marginTop: em(-sliderBtnSize[1] / 2),
    width: em(sliderBtnSize[0] + sliderBtnOffset),
    height: em(sliderBtnSize[1]),
    paddingRight: em(sliderBtnOffset),
    background: `${theme.colors.backgroundDark}F0`,
    color: theme.colors.text,
    border: `1px solid ${theme.colors.backgroundDark}`,
    borderRight: 'none',
    borderTopLeftRadius: em(theme.borderRadius.md),
    borderBottomLeftRadius: em(theme.borderRadius.md),
    boxShadow: theme.shadows.md,
    cursor: 'pointer',
    transform: `translateX(${em(sliderBtnOffset)})`,
    transition: `opacity 0.15s ease-in, transform 0.15s ease-in`,

    ':hover': {
      transform: `translateX(0)`,
    },

    ':hover .icon': {
      transform: `scaleY(1) translateX(${em(sliderBtnOffset / 2)})`,
    },

    ':active .icon': {
      transform: `scaleY(0.85) translateX(${em(sliderBtnOffset / 2)})`,
    },
  }),

  hide: css({
    transform: `translateX(100%) !important`,
  }),

  icon: css({
    height: em(40),
    transform: 'scaleY(0.85) translateX(0em)',
    transition: 'transform 0.15s ease-in',
  }),
}
