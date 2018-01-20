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
    padding: `${em(theme.spacing.sm)} ${em(theme.spacing.md)}}`,
    marginBottom: em(theme.spacing.md),
    color: theme.colors.text,
    backgroundColor: theme.colors.lightGray,
    border: `1px solid ${theme.colors.gray}`,
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.shadows.sm,
    ':focus': {
      borderColor: theme.colors.darkGray,
    },
    '::placeholder': {
      color: theme.colors.darkGray,
      opacity: 1,
    },
  }),

  inputIcon: css({
    paddingLeft: em(theme.spacing.lg),
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
      fill: theme.colors.darkGray,
    },
  }),
}

export default Input
