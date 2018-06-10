import { css } from 'emotion'
import theme, { em } from '../../theme'

const shadowSize = 30
const buttonSize = [64, 128]
const buttonOffset = theme.gutters.md

export default {
  wrapper: css({
    ':hover .button': {
      opacity: 1,
    },
  }),

  title: css({
    paddingLeft: em(theme.container.gutter),
  }),

  clip: css({
    position: 'relative',
    overflow: 'hidden',
    // Compensate for overflow: hidden and shadow.
    marginTop: em(-shadowSize),
    marginBottom: em(-shadowSize),
    padding: em(shadowSize),
    paddingLeft: em(theme.container.gutter),
  }),

  row: css({
    display: 'flex',
    marginLeft: em(-theme.gutters.md / 2),
    width: `calc(100% + ${em(theme.gutters.md / 2)})`,
  }),

  item: css({
    // Ensure there is always a fraction of the next item visible.
    // TODO: Use media queries to change this value.
    width: '30%',
    flexShrink: 0,
    paddingLeft: em(theme.gutters.md / 2),
    paddingRight: em(theme.gutters.md / 2),
  }),

  button: css({
    opacity: 0,
    position: 'absolute',
    fontSize: 'inherit',
    right: 0,
    top: '50%',
    marginTop: em(-buttonSize[1] / 2),
    width: em(buttonSize[0] + buttonOffset),
    height: em(buttonSize[1]),
    paddingRight: em(buttonOffset),
    background: `${theme.colors.backgroundDark}F0`,
    color: theme.colors.text,
    border: `1px solid ${theme.colors.backgroundDark}`,
    borderRight: 'none',
    borderTopLeftRadius: em(theme.borderRadius.md),
    borderBottomLeftRadius: em(theme.borderRadius.md),
    boxShadow: theme.shadows.md,
    cursor: 'pointer',
    transform: `translateX(${em(buttonOffset)})`,
    transition: `opacity 0.15s ease-in, transform 0.15s ease-in`,

    ':hover': {
      transform: `translateX(0)`,
    },

    ':hover .icon': {
      transform: `scaleY(1) translateX(${em(buttonOffset / 2)})`,
    },

    ':active .icon': {
      transform: `scaleY(0.85) translateX(${em(buttonOffset / 2)})`,
    },
  }),

  icon: css({
    height: em(40),
    transform: 'scaleY(0.85) translateX(0em)',
    transition: 'transform 0.15s ease-in',
  }),
}
