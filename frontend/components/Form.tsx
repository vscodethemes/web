import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'

interface FormProps {
  children: React.ReactNode
}

const Form = ({ children }: FormProps) => (
  <div className={styles}>{children}</div>
)

const styles = css({
  marginTop: theme.spacing.xxl,
  maxWidth: em(280),
})

export default Form
