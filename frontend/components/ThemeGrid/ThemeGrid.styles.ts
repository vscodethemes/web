import { css } from 'emotion'
import theme, { em } from '../../theme'

const breakpoints = [
  `@media (max-width: ${em(1440)})`,
  `@media (max-width: ${em(1150)})`,
  `@media (max-width: ${em(620)})`,
]

export default {
  grid: css({
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginLeft: em(-theme.gutters.lg / 2),
    marginRight: em(-theme.gutters.lg / 2),
    width: `calc(100% + ${em(theme.gutters.lg)})`,
  }),

  item: css({
    width: '25%',
    maxWidth: 460,
    paddingLeft: em(theme.gutters.lg / 2),
    paddingRight: em(theme.gutters.lg / 2),
    marginBottom: em(theme.gutters.lg),

    [breakpoints[0]]: {
      width: '33.3333%',
    },
    [breakpoints[1]]: {
      width: '50%',
    },
    [breakpoints[2]]: {
      width: '100%',
    },
  }),
}
