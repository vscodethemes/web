import theme, { em } from '../../theme'

const size = [64, 128]
const offset = theme.gutters.md

export default function createButtonStyles(isLeftAligned: boolean = false) {
  const translateOffset = isLeftAligned ? -offset : offset
  return {
    button: {
      opacity: 0,
      position: 'absolute',
      fontSize: 'inherit',
      top: '50%',
      marginTop: em(-size[1] / 2),
      width: em(size[0] + offset),
      height: em(size[1]),
      background: `${theme.colors.backgroundDark}F0`,
      color: theme.colors.text,
      border: `1px solid ${theme.colors.backgroundDark}`,
      boxShadow: theme.shadows.md,
      cursor: 'pointer',
      transform: `translateX(${em(translateOffset)})`,
      transition: `opacity 0.15s ease-in, transform 0.15s ease-in`,

      ...(isLeftAligned
        ? {
            left: 0,
            borderLeft: 'none',
            paddingLeft: em(offset),
            borderTopRightRadius: em(theme.borderRadius.md),
            borderBottomRightRadius: em(theme.borderRadius.md),
          }
        : {
            right: 0,
            borderRight: 'none',
            paddingRight: em(offset),
            borderTopLeftRadius: em(theme.borderRadius.md),
            borderBottomLeftRadius: em(theme.borderRadius.md),
          }),

      ':hover': {
        transform: `translateX(0)`,
      },

      ':hover .icon': {
        transform: `scaleY(1) translateX(${em(translateOffset / 2)})`,
      },

      ':active .icon': {
        transform: `scaleY(0.85) translateX(${em(translateOffset / 2)})`,
      },
    },

    hide: {
      transform: isLeftAligned
        ? `translateX(-100%) !important`
        : `translateX(100%) !important`,
    },

    icon: {
      height: em(40),
      transform: 'scaleY(0.85) translateX(0em)',
      transition: 'transform 0.15s ease-in',
    },
  }
}
