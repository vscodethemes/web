import { css } from 'emotion'
import theme, { em } from '../../theme'

export const classes = {
  row: css({
    marginTop: em(theme.gutters.lg),
  }),

  rowFooter: css({
    display: 'flex',
    justifyContent: 'flex-end',
    color: theme.colors.textMuted,
    marginTop: em(theme.gutters.md),
    paddingRight: em(theme.container.gutter),
  }),
}
