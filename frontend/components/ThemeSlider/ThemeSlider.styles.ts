import { css } from 'emotion'
import theme, { rem, withContainer } from '../../theme'

const shadowSize = 30

export default {
  wrapper: css({
    marginBottom: rem(theme.gutters.lg),
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
    marginLeft: rem(theme.gutters.sm),
    textAlign: 'center',
    paddingLeft: rem(theme.gutters.xs),
    paddingRight: rem(theme.gutters.xs),
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
    marginTop: rem(-shadowSize),
    marginBottom: rem(-shadowSize),
    padding: rem(shadowSize),
    paddingLeft: rem(theme.container.gutter),

    [`:hover .next`]: {
      opacity: 1,
    },
  }),

  row: css({
    display: 'flex',
    marginLeft: rem(-theme.gutters.md / 2),
    width: `calc(100% + ${rem(theme.gutters.md / 2)})`,
  }),

  item: css({
    // Ensure there is always a fraction of the next item visible.
    // TODO: Use media queries to change this value.
    width: '30%',
    flexShrink: 0,
    paddingLeft: rem(theme.gutters.md / 2),
    paddingRight: rem(theme.gutters.md / 2),
  }),

  previous: css({
    position: 'absolute',
    top: rem(shadowSize),
    bottom: rem(shadowSize),
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
