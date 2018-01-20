import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'

interface TabsProps {
  children: React.ReactNode
}

const Tabs = ({ children }: TabsProps) => (
  <div className={styles}>{children}</div>
)

const styles = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: theme.spacing.md,
  maxWidth: em(220),
})

export default Tabs
