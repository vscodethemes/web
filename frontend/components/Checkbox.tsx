import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'

interface CheckboxProps {
  checked: boolean
  onChange: (value: boolean) => any
  label?: string
}

const Checkbox: React.SFC<CheckboxProps> = ({ checked, onChange, label }) => (
  <label className={classes.label}>
    <input
      type="checkbox"
      checked={checked}
      onChange={evt => onChange(evt.target.checked)}
      className={classes.input}
    />
    <span className={classes.text}>{label}</span>
  </label>
)

Checkbox.defaultProps = {
  checked: false,
}

const classes = {
  label: css({
    display: 'flex',
    alignItems: 'center',
    marginBottom: em(theme.spacing.sm),
    cursor: 'pointer',
  }),

  text: css({
    fontSize: em(theme.fontSizes.md),
    color: theme.colors.text,
  }),

  input: css({
    margin: 0,
    marginRight: em(theme.spacing.sm),
  }),
}

export default Checkbox
