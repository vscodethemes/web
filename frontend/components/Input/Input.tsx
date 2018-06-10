import { cx } from 'emotion'
import * as React from 'react'
import Icon, { Icons } from '../Icon'
import styles from './Input.styles'

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
  <div className={styles.container}>
    {icon && (
      <div className={styles.icon}>
        <Icon icon="search" />
      </div>
    )}
    <input
      type={type || 'text'}
      value={value || ''}
      placeholder={placeholder}
      onChange={evt => onChange(evt.target.value)}
      className={cx(styles.input, icon && styles.inputIcon)}
    />
  </div>
)

export default Input
