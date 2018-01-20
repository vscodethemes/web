import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'

interface ContainerProps {
  children: React.ReactNode
}

const Container: React.SFC<ContainerProps> = ({ children }) => (
  <div className={classes.container}>{children}</div>
)

const classes = {
  container: css({
    margin: '0 auto',
    maxWidth: em(840),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  }),
}

export default Container
