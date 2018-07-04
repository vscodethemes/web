import theme, { rem } from '../../theme'

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
      marginTop: rem(-size[1] / 2),
      width: rem(size[0] + offset),
      height: rem(size[1]),
      background: theme.colors.backgroundInverse,
      color: theme.colors.text,
      border: 0,
      outline: 0,
      boxShadow: theme.shadows.md,
      cursor: 'pointer',
      transform: `translateX(${rem(translateOffset)})`,
      transition: `opacity 0.15s ease-in, transform 0.15s ease-in`,

      ...(isLeftAligned
        ? {
            left: 0,
            borderLeft: 'none',
            paddingLeft: rem(offset),
            borderTopRightRadius: rem(theme.borderRadius.md),
            borderBottomRightRadius: rem(theme.borderRadius.md),
          }
        : {
            right: 0,
            borderRight: 'none',
            paddingRight: rem(offset),
            borderTopLeftRadius: rem(theme.borderRadius.md),
            borderBottomLeftRadius: rem(theme.borderRadius.md),
          }),

      ':hover': {
        transform: `translateX(0)`,
      },

      ':hover .icon': {
        transform: `scaleY(1) translateX(${rem(translateOffset / 2)})`,
      },

      ':active .icon': {
        transform: `scaleY(0.85) translateX(${rem(translateOffset / 2)})`,
      },
    },

    hide: {
      transform: isLeftAligned
        ? `translateX(-100%) !important`
        : `translateX(100%) !important`,
    },

    icon: {
      height: rem(40),
      transform: 'scaleY(0.85) translateX(0em)',
      transition: 'transform 0.15s ease-in',
    },
  }
}
