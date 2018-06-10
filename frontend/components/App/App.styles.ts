import { css, injectGlobal } from 'emotion'
import theme, { em, rootFontSize } from '../../theme'

injectGlobal({
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },

  html: {
    height: '100%',
    fontSize: rootFontSize,
  },

  body: {
    height: '100%',
    fontFamily: theme.fonts.sansSerif,
    fontWeight: 'normal',
    letterSpacing: em(0.3),
    margin: 0,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  },

  '#__next': {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
})

export default {
  container: css({
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: em(theme.header.height),

    [theme.breakpoints.pageMin]: {
      paddingTop: em(theme.header.heightCollapsed),
    },
  }),
}
