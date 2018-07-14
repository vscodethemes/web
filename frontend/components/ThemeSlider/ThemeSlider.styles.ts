import { css } from 'emotion'
import theme, { rem, withContainer } from '../../theme'

const shadowSize = 30

export const sizes = [
  { media: `(max-width: ${rem(700)})`, width: 85 },
  {
    media: `(min-width: ${rem(700)}) and (max-width: ${rem(800)})`,
    width: 75,
  },
  {
    media: `(min-width: ${rem(800)}) and (max-width: ${rem(920)})`,
    width: 45,
  },
  {
    media: `(min-width: ${rem(920)}) and (max-width: ${rem(1200)})`,
    width: 42,
  },
  {
    media: `(min-width: ${rem(1200)}) and (max-width: ${rem(1500)})`,
    width: 30,
  },
  { media: `(min-width: ${rem(1500)})`, width: 22.5 },
]

const withSizes = (baseStyles = {}) =>
  sizes.reduce(
    (curStyles, size) => ({
      ...curStyles,
      [`@media ${size.media}`]: {
        width: `${size.width}%`,
      },
    }),
    baseStyles,
  )

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
    paddingLeft: rem(theme.gutters.lg),

    [theme.breakpoints.mobile]: {
      paddingLeft: rem(theme.gutters.md),
    },

    [`:hover .next`]: {
      opacity: 1,
    },
  }),

  row: css({
    display: 'flex',
    marginLeft: rem(-theme.gutters.md / 2),
    width: `calc(100% + ${rem(theme.gutters.md / 2)})`,
  }),

  item: css(
    withSizes({
      flexShrink: 0,
      paddingLeft: rem(theme.gutters.md / 2),
      paddingRight: rem(theme.gutters.md / 2),
    }),
  ),

  previous: css({
    position: 'absolute',
    top: rem(shadowSize),
    bottom: rem(shadowSize),
    left: 0,
    width: theme.gutters.lg,

    [`:hover .previous`]: {
      opacity: 1,
    },
  }),

  previousExpanded: css({
    width: theme.gutters.lg * 4,
  }),
}
