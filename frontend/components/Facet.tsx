import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'

const Facet: React.SFC<{}> = ({ children }) => (
  <div className={classes.facet}>{children}</div>
)

const classes = {
  facet: css({
    color: theme.colors.textMuted,
    fontSize: em(theme.fontSizes.xs),
    marginLeft: em(theme.gutters.sm),
  }),
}

export default Facet
