import { css } from 'emotion'
import theme, { rem } from '../../theme'
import { boxHeight, boxWidth } from './Page.styles'

export default {
  pagination: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rem(theme.gutters.lg - theme.gutters.sm),
    marginLeft: 'auto',
    marginRight: 'auto',
    color: theme.colors.text,
  }),

  icon: css({
    height: rem(theme.fontSizes.md),
  }),

  page: css({
    position: 'relative',
    width: '100%',
    fontSize: rem(theme.fontSizes.md),
    lineHeight: rem(theme.fontSizes.md),
    padding: `0 0 ${rem(theme.gutters.sm)}`,
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
      marginLeft: rem(-boxWidth / 2),
      height: rem(boxHeight),
      width: rem(boxWidth),
      borderRadius: rem(boxHeight),
      backgroundColor: theme.colors.palette[4],
    },
  }),
}
