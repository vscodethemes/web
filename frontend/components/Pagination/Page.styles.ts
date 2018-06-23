import { css } from 'emotion'
import theme, { em } from '../../theme'

export const boxWidth = 20
export const boxHeight = 2

export default {
  icon: css({
    height: em(theme.fontSizes.md),
  }),

  page: css({
    width: '100%',
    maxWidth: em(theme.gutters.md * 2 + theme.fontSizes.md),
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: `0 0 ${em(theme.gutters.sm)}`,
    fontSize: em(theme.fontSizes.md),
    lineHeight: em(theme.fontSizes.md),
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
      marginLeft: em(-boxWidth / 2),
      height: em(boxHeight),
      width: em(boxWidth),
      borderRadius: em(boxHeight),
      backgroundColor: theme.colors.palette[4],
    },
  }),
}
