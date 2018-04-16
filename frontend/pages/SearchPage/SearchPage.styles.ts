import { css } from 'emotion'
import theme, { em } from '../../theme'

const mainMaxWidth = 430
const asideWidth =
  theme.pageSizes.max - mainMaxWidth - theme.container.gutter * 2

export const classes = {
  container: css({
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',

    [theme.breakpoints.pageMin]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  }),

  main: css({
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: em(asideWidth),
    paddingTop: em(theme.container.gutter),

    [theme.breakpoints.pageMax]: {
      marginLeft: 0,
    },
    [theme.breakpoints.pageMin]: {
      maxWidth: em(mainMaxWidth),
      margin: '0 auto',
      paddingLeft: 0,
    },
  }),

  aside: css({
    position: 'fixed',
    left: '50%',
    width: em(asideWidth),
    marginTop: em(theme.header.height + theme.gutters.lg),
    marginLeft: em(-theme.pageSizes.max / 2 + theme.container.gutter),
    paddingRight: em(theme.gutters.lg),

    [theme.breakpoints.pageMax]: {
      top: 0,
      left: em(theme.container.gutter),
      marginLeft: 0,
      marginTop: em(theme.header.height + theme.gutters.md),
    },
    [theme.breakpoints.pageMin]: {
      position: 'static',
      margin: 0,
      width: '100%',
      paddingRight: 0,
    },
  }),

  sortBy: css({
    height: em(theme.header.height),
    marginBottom: em(theme.gutters.md),

    [theme.breakpoints.pageMin]: {
      position: 'fixed',
      zIndex: 200,
      top: 0,
      left: em(theme.gutters.lg),
      right: em(theme.gutters.lg),
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      height: em(theme.header.heightCollapsed),
      marginBottom: 0,
    },
  }),

  filters: css({
    [theme.breakpoints.pageMin]: {
      paddingTop: em(theme.container.gutter),
      paddingBottom: em(theme.container.gutter),
      borderBottom: `1px solid ${theme.colors.inputBorder}`,
    },
  }),

  facets: css({
    [theme.breakpoints.pageMin]: {
      display: 'flex',
      flexDirection: 'row',
    },
  }),
}
