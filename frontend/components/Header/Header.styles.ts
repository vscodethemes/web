import * as Color from 'color'
import { css } from 'emotion'
import theme, { rem, withContainer } from '../../theme'

export default {
  header: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: rem(theme.header.height),
    backgroundColor: Color(theme.colors.backgroundDark)
      .alpha(0.9)
      .toString(),
    zIndex: 1000,
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
