import { css } from 'emotion'
import theme, { rem } from '../../theme'

export default {
  header: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: rem(theme.header.height),
    padding: `0 ${rem(theme.container.gutter)}`,
    backgroundColor: `${theme.header.backgroundColor}F0`,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
  }),

  sep: css({
    opacity: 0.25,
    color: theme.colors.text,
    marginLeft: theme.gutters.sm,
    marginRight: theme.gutters.sm,
  }),

  search: css({
    width: rem(220),
  }),
}
