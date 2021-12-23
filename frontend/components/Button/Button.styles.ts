import { css, keyframes } from 'emotion'
import theme, { rem } from '../../theme'

const iconOffsetLeft = theme.gutters.md - theme.fontSizes.md / 2

const slideIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(100%)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(120%)',
  },
})

export default {
  button: css({
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: rem(theme.fontSizes.sm),
    color: theme.colors.textInverse,
    backgroundColor: theme.colors.palette[0],
    padding: `${rem(theme.gutters.sm)} ${rem(theme.gutters.md)}`,
    border: 0,
    outline: 0,
    borderRadius: rem(theme.borderRadius.sm),
    boxShadow: theme.shadows.sm,
    cursor: 'pointer',
    textDecoration: 'none',
    transform: 'translateY(0)',
    transition: `transform 0.15s ${theme.animation.bezier}`,

    ':hover': {
      transform: `translateY(${rem(-1)})`,
      boxShadow: theme.shadows.md,
    },
    ':active': {
      transform: 'translateY(0)',
      boxShadow: theme.shadows.sm,
    },
    '& svg': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: rem(iconOffsetLeft),
    },
  }),

  buttonIcon: css({
    paddingLeft: rem(iconOffsetLeft + theme.fontSizes.md + theme.gutters.xs),
  }),

  buttonSplit: css({
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,

    ':hover': {
      transform: 'none',
      boxShadow: 'none',
    },
  }),

  buttonGroup: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',

    ':hover': {
      transform: `translateY(${rem(-1)})`,
      boxShadow: theme.shadows.md,
    },

    '& .button': {
      boxShadow: 'none',
    },
    '& .button:hover': {
      backgroundColor: theme.colors.primaryLight,
      boxShadow: 'none',
      transform: 'none',
    },
    '& .button:active': {
      backgroundColor: theme.colors.primary,
    },
  }),

  buttonGroupOpen: css({
    transform: `translateY(${rem(-1)})`,
    boxShadow: theme.shadows.md,
  }),

  buttonDropdown: css({
    borderLeft: `1px solid rgba(255, 255, 255, 0.15)`,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    paddingLeft: rem(theme.gutters.sm),
    paddingRight: rem(theme.gutters.sm),

    '& svg': {
      position: 'static',
      transform: 'none',
    },
  }),

  buttonDropdownOpen: css({
    backgroundColor: theme.colors.primaryLight,
  }),

  dropdown: css({
    display: 'none',
    position: 'absolute',
    right: 0,
    bottom: 0,
    border: `1px solid rgba(255, 255, 255, 0.15)`,
    borderRadius: theme.borderRadius.sm,
    animation: `${slideIn} 0.1s ${theme.animation.bezier}`,
    animationFillMode: 'forwards',
    boxShadow: theme.shadows.sm,
  }),

  dropdownOpen: css({
    display: 'block',
  }),
}
