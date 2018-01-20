import { css, cx } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'
import Icon, { Icons } from './Icon'

interface InputProps {
  type: 'text' | 'search' | 'email' | 'password'
  value: string
  placeholder?: string
  icon?: Icons
  onChange: (value: string) => any
}

const Input = ({ icon, onChange, ...inputProps }: InputProps) => (
  <div className={containerStyles}>
    {icon && (
      <div className={iconStyles}>
        <Icon icon="search" />
      </div>
    )}
    <input
      className={cx(inputStyles, icon && inputIconStyles)}
      onChange={evt => onChange(evt.target.value)}
      {...inputProps}
    />
  </div>
)

const containerStyles = css({
  position: 'relative',
})

const inputStyles = css({
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
})

const inputIconStyles = css({
  paddingLeft: em(theme.spacing.lg),
})

const iconStyles = css({
  position: 'absolute',
  top: 0,
  left: 0,
  height: em(44),
  display: 'flex',
  alignItems: 'center',
  paddingLeft: em(theme.fontSizes.md),
  '> svg': {
    fill: theme.colors.darkGray,
  },
})

export default Input
