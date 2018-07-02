import { css } from 'emotion'
import theme, { rem } from '../../theme'

const iconOffsetLeft = theme.gutters.md - theme.fontSizes.md / 2

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
    ' svg': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: rem(iconOffsetLeft),
    },
  }),

  buttonIcon: css({
    paddingLeft: rem(iconOffsetLeft + theme.fontSizes.md + theme.gutters.xs),
  }),
}
