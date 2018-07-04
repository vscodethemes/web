import { css } from 'emotion'
import theme, { rem } from '../../theme'

export const boxWidth = 20
export const boxHeight = 2

export default {
  icon: css({
    height: rem(theme.fontSizes.md),
  }),

  page: css({
    width: '100%',
    maxWidth: rem(theme.gutters.md * 2 + theme.fontSizes.md),
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: `0 0 ${rem(theme.gutters.sm)}`,
    fontSize: rem(theme.fontSizes.md),
    lineHeight: rem(theme.fontSizes.md),
    background: 'transparent',
    border: 'none',
    color: theme.colors.text,
    cursor: 'pointer',
    outline: 'none',
    textDecoration: 'none',
    ':hover': {
      color: theme.colors.palette[0],
    },
  }),

  active: css({
    color: theme.colors.palette[0],
    '::after': {
      content: `''`,
      position: 'absolute',
      bottom: 0,
      left: '50%',
      marginLeft: rem(-boxWidth / 2),
      height: rem(boxHeight),
      width: rem(boxWidth),
      borderRadius: rem(boxHeight),
      backgroundColor: theme.colors.palette[4],
    },
  }),
}
