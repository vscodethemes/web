import { css } from 'emotion'
import theme, { em } from '../../theme'

export default {
  grid: css({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginLeft: em(-theme.gutters.lg / 2),
    marginRight: em(-theme.gutters.lg / 2),
    width: `calc(100% + ${em(theme.gutters.lg)})`,
  }),

  item: css({
    width: '33.3333%',
    // width: '100%',
    maxWidth: 440,
    paddingLeft: em(theme.gutters.lg / 2),
    paddingRight: em(theme.gutters.lg / 2),
    marginBottom: em(theme.gutters.lg),
  }),
}
