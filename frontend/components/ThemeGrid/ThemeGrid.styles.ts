import { css } from 'emotion'
import theme, { rem } from '../../theme'

export default {
  grid: css({
    display: 'grid',
    gridGap: rem(theme.gutters.lg),
    marginBottom: rem(theme.gutters.lg),
    gridTemplateColumns: 'repeat(4, 1fr)',

    [`@media (max-width: ${rem(1440)})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [`@media (max-width: ${rem(1150)})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [`@media (max-width: ${rem(620)})`]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  }),

  item: css({
    width: '100%',
    maxWidth: 460,
    margin: '0 auto',
  }),
}
