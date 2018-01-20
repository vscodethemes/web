import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'

interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => (
  <div className={styles}>{children}</div>
)

const styles = css({
  margin: '0 auto',
  maxWidth: em(840),
  paddingLeft: theme.spacing.md,
  paddingRight: theme.spacing.md,
})

export default Container
