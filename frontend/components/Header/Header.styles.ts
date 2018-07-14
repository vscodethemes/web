import { css } from 'emotion'
import theme, { rem, withContainer } from '../../theme'

export default {
  header: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: rem(theme.header.height),
    backgroundColor: `${theme.header.backgroundColor}F0`,
    zIndex: 100,
  }),

  container: css({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  }),

  logo: css(withContainer({})),

  nav: css({
    height: '100%',
  }),

  sep: css({
    opacity: 0.25,
    color: theme.colors.text,
    marginLeft: theme.gutters.sm,
    marginRight: theme.gutters.sm,
  }),

  search: css(
    withContainer({
      width: rem(220),
    }),
  ),
}
