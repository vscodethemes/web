import { css } from 'emotion'
import theme, { rem } from '../../theme'

const statusBarGutter = theme.gutters.xs

export default {
  statusBar: css({
    height: `${rem(theme.fontSizes.xs + statusBarGutter * 2)}`,
    display: 'flex',
    alignItems: 'center',
    borderBottomLeftRadius: rem(theme.borderRadius.md),
    borderBottomRightRadius: rem(theme.borderRadius.md),
  }),

  stat: css({
    display: 'flex',
    justifyContent: 'center',
    fontSize: rem(theme.fontSizes.xs),
    marginLeft: rem(theme.gutters.xs),

    ' svg': {
      marginRight: rem(theme.gutters.xs / 2),
      height: rem(theme.fontSizes.xs * 1.25),
    },
  }),
}
