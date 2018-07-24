import { css } from 'emotion'
import theme, { rem, withContainer } from '../../theme'
import hexToRGB from '../../utils/hexToRGB'

export default {
  header: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: rem(theme.header.height),
    backgroundColor: hexToRGB(theme.colors.backgroundDark, 0.9),
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
