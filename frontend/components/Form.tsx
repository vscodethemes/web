import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'

interface FormProps {
  children: React.ReactNode
}

const Form: React.SFC<FormProps> = ({ children }) => (
  <div className={classes.form}>{children}</div>
)

const classes = {
  form: css({
    marginTop: em(theme.spacing.xxl),
    maxWidth: em(280),
  }),
}

export default Form
