import { css } from 'emotion'
import theme, { em } from '../../theme'

const shadowSize = 30
const sliderBtnSize = [64, 128]
const sliderBtnOffset = theme.gutters.md

export default {
  wrapper: css({
    [`:hover .next`]: {
      opacity: 1,
    },
  }),

  title: css({
    paddingLeft: em(theme.container.gutter),
  }),

  clip: css({
    position: 'relative',
    overflow: 'hidden',
    // Compensate for overflow: hidden and shadow.
    marginTop: em(-shadowSize),
    marginBottom: em(-shadowSize),
    padding: em(shadowSize),
    paddingLeft: em(theme.container.gutter),
  }),

  row: css({
    display: 'flex',
    marginLeft: em(-theme.gutters.md / 2),
    width: `calc(100% + ${em(theme.gutters.md / 2)})`,
  }),

  item: css({
    // Ensure there is always a fraction of the next item visible.
    // TODO: Use media queries to change this value.
    width: '30%',
    flexShrink: 0,
    paddingLeft: em(theme.gutters.md / 2),
    paddingRight: em(theme.gutters.md / 2),
  }),
}
