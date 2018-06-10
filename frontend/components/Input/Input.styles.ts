import { css } from 'emotion'
import theme, { em } from '../../theme'
import iconStyles from '../Icon/Icon.styles'

export default {
  container: css({
    position: 'relative',
  }),

  input: css({
    display: 'block',
    width: '100%',
    height: em(44),
    lineHeight: em(44),
    letterSpacing: em(0.6),
    fontSize: em(theme.fontSizes.md),
    padding: `${em(theme.gutters.sm)} ${em(theme.gutters.md)}}`,
    marginBottom: em(theme.gutters.md),
    color: theme.colors.text,
    backgroundColor: theme.colors.inputBackground,
    border: `1px solid ${theme.colors.inputBorder}`,
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.shadows.sm,
    WebkitAppearance: 'none',
    ':focus': {
      borderColor: theme.colors.palette[0],
    },
    '::placeholder': {
      color: theme.colors.textMuted,
      opacity: 1,
    },
  }),

  inputIcon: css({
    paddingLeft: em(theme.gutters.lg),
  }),

  icon: css({
    position: 'absolute',
    top: 0,
    left: 0,
    height: em(44),
    display: 'flex',
    alignItems: 'center',
    paddingLeft: em(theme.fontSizes.md),
    [`.${iconStyles.svg}`]: {
      fill: theme.colors.textMuted,
    },
  }),
}
