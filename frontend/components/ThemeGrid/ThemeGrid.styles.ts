import { css } from 'emotion'
import theme, { em } from '../../theme'

const breakpoints = [
  `@media (max-width: ${em(1440)})`,
  `@media (max-width: ${em(1150)})`,
  `@media (max-width: ${em(620)})`,
]

export default {
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: em(theme.gutters.lg),
    marginBottom: em(theme.gutters.lg),

    [breakpoints[0]]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [breakpoints[1]]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [breakpoints[2]]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  }),

  item: css({
    width: '100%',
    maxWidth: 460,
    margin: '0 auto',
  }),
}
