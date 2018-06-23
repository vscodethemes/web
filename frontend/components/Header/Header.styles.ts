import { css } from 'emotion'
import theme, { em } from '../../theme'

export default {
  header: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: em(theme.header.height),
    padding: `0 ${em(theme.container.gutter)}`,
    backgroundColor: `${theme.header.backgroundColor}F5`, // FA = 96% transparency for 8-digit hex value.
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.pageMin]: {
      height: em(theme.header.heightCollapsed),
      backgroundColor: `${theme.header.backgroundColor}F5`,
    },
  }),

  sep: css({
    color: theme.colors.textMuted,
    marginLeft: theme.gutters.sm,
    marginRight: theme.gutters.sm,
  }),
}
