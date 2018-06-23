import { css } from 'emotion'
import theme, { em, withContainer } from '../../theme'

const shadowSize = 30

export default {
  wrapper: css({
    marginBottom: em(theme.gutters.lg),
  }),

  title: css(
    withContainer({
      position: 'relative',
      zIndex: 20,
      display: 'flex',
      alignItems: 'flex-end',
    }),
  ),

  more: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: em(theme.gutters.sm),
    textAlign: 'center',
    paddingLeft: em(theme.gutters.xs),
    paddingRight: em(theme.gutters.xs),
    color: theme.colors.text,
    cursor: 'pointer',
    textDecoration: 'none',
    opacity: 1,

    ':hover': {
      color: theme.colors.palette[0],
    },
  }),

  clip: css({
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden',
    // Compensate for overflow: hidden and shadow.
    marginTop: em(-shadowSize),
    marginBottom: em(-shadowSize),
    padding: em(shadowSize),
    paddingLeft: em(theme.container.gutter),

    [`:hover .next`]: {
      opacity: 1,
    },
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

  previous: css({
    position: 'absolute',
    top: em(shadowSize),
    bottom: em(shadowSize),
    left: 0,
    width: theme.container.gutter,

    [`:hover .previous`]: {
      opacity: 1,
    },
  }),

  previousExpanded: css({
    width: theme.container.gutter * 4,
  }),
}
