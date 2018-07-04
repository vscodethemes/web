import { css } from 'emotion'
import theme, { rem } from '../../theme'

const boxWidth = 36
const boxHeight = 2

export default {
  link: css({
    height: '100%',
    position: 'relative',
    // paddingBottom: rem(boxHeight),
    textDecoration: 'none',
    color: theme.colors.text,
    outline: 0,
    ':hover, :focus': {
      color: `${theme.colors.palette[0]}`,
    },
  }),

  text: css({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: rem(theme.fontSizes.sm),
  }),

  active: css({
    // The order that emotion adds rules is not guaranteed so we need
    // to add !important to override the non-active color. I hope there's
    // a better way.
    color: `${theme.colors.palette[0]} !important`,
    '::after': {
      content: `''`,
      position: 'absolute',
      bottom: 0,
      left: '50%',
      marginLeft: rem(-boxWidth / 2),
      height: rem(boxHeight),
      width: rem(boxWidth),
      borderRadius: rem(boxHeight),
    },
  }),

  highlight: (color: string) => css({ '::after': { backgroundColor: color } }),
}
