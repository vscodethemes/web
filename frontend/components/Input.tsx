import { css, cx } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'
import Icon, { classes as iconClasses, Icons } from './Icon'

interface InputProps {
  type: 'text' | 'search' | 'email' | 'password'
  value: string
  placeholder?: string
  icon?: Icons
  onChange: (value: string) => any
}

const Input: React.SFC<InputProps> = ({
  type,
  value,
  placeholder,
  icon,
  onChange,
}) => (
  <div className={classes.container}>
    {icon && (
      <div className={classes.icon}>
        <Icon icon="search" />
      </div>
    )}
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={evt => onChange(evt.target.value)}
      className={cx(classes.input, icon && classes.inputIcon)}
    />
  </div>
)

Input.defaultProps = {
  type: 'text',
  value: '',
}

const classes = {
  container: css({
    position: 'relative',
  }),

  input: css({
    display: 'block',
    width: '100%',
    height: em(44),
    lineHeight: em(44),
    fontSize: em(theme.fontSizes.md),
    padding: `${em(theme.gutters.sm)} ${em(theme.gutters.md)}}`,
    marginBottom: em(theme.gutters.md),
    color: theme.colors.text,
    backgroundColor: theme.colors.inputBackground,
    border: `1px solid ${theme.colors.inputBorder}`,
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.shadows.sm,
    ':focus': {
      borderColor: theme.colors.primary,
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
    [`.${iconClasses.svg}`]: {
      fill: theme.colors.textMuted,
    },
  }),
}

export default Input
