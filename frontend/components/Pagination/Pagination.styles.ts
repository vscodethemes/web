import { css } from 'emotion'
import theme, { em } from '../../theme'
import { boxHeight, boxWidth } from './Page.styles'

export default {
  pagination: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: em(theme.gutters.lg - theme.gutters.sm),
    marginLeft: 'auto',
    marginRight: 'auto',
    color: theme.colors.text,
  }),

  icon: css({
    height: em(theme.fontSizes.md),
  }),

  page: css({
    position: 'relative',
    width: '100%',
    fontSize: em(theme.fontSizes.md),
    lineHeight: em(theme.fontSizes.md),
    padding: `0 0 ${em(theme.gutters.sm)}`,
    background: 'transparent',
    border: 'none',
    color: theme.colors.text,
    cursor: 'pointer',
    outline: 'none',
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
