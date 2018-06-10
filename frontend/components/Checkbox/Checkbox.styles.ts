import { css } from 'emotion'
import theme, { em } from '../../theme'

export default {
  label: css({
    display: 'flex',
    alignItems: 'center',
    marginBottom: em(theme.gutters.sm),
    marginRight: em(theme.gutters.sm),
    cursor: 'pointer',

    [theme.breakpoints.pageMin]: {
      marginBottom: 0,
      marginRight: em(theme.gutters.sm),
      minWidth: em(100),
    },
  }),

  text: css({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    fontSize: em(theme.fontSizes.md),
    color: theme.colors.text,
  }),

  input: css({
    margin: 0,
    marginRight: em(theme.gutters.sm),
  }),
}
