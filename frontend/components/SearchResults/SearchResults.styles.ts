import { css } from 'emotion'
import theme from '../../theme'

export default {
  empty: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  emptyMessage: css({
    color: theme.colors.textMuted,
    marginTop: 0,
    marginBottom: theme.gutters.sm,
  }),

  clear: css({
    fontSize: theme.fontSizes.md,
    background: 'transparent',
    border: 0,
    color: theme.colors.text,
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.palette[0],
    },
  }),

  footer: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
}
