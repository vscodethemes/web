import { css } from 'emotion'
import theme, { rem } from '../../theme'

export default {
  container: css({
    position: 'relative',
    marginLeft: rem(theme.gutters.lg),
    width: '100%',
  }),

  input: css({
    display: 'block',
    width: '100%',
    height: rem(30),
    lineHeight: rem(30),
    letterSpacing: rem(0.6),
    fontSize: rem(theme.fontSizes.sm),
    padding: rem(theme.gutters.sm),
    paddingLeft: rem(theme.gutters.lg),
    color: theme.colors.text,
    backgroundColor: `${theme.colors.inputBackground}88`,
    border: 0,
    outline: 0,
    borderRadius: rem(theme.borderRadius.round),
    WebkitAppearance: 'none',

    ':focus': {
      backgroundColor: `${theme.colors.inputBackground}F0`,
    },

    '::placeholder': {
      color: theme.colors.textMuted,
    },
  }),

  icon: css({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: rem(theme.fontSizes.sm),

    ' svg': {
      fill: `${theme.colors.textMuted}88`,
    },
  }),
}
