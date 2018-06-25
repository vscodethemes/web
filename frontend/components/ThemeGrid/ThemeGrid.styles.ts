import { css } from 'emotion'
import theme, { em } from '../../theme'

export default {
  grid: css({
    display: 'grid',
    gridGap: em(theme.gutters.lg),
    marginBottom: em(theme.gutters.lg),
    gridTemplateColumns: 'repeat(4, 1fr)',

    [`@media (max-width: ${em(1440)})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [`@media (max-width: ${em(1150)})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [`@media (max-width: ${em(620)})`]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  }),

  item: css({
    width: '100%',
    maxWidth: 460,
    margin: '0 auto',
  }),
}
