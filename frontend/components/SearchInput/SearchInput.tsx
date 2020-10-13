import { cx } from 'emotion'
import * as React from 'react'
import { Icon, Icons } from '../'
import styles from './SearchInput.styles'

interface SearchInputProps {
  value: string
  name: string
  active?: boolean
  placeholder?: string
  onChange?: (value: string) => any
}

const SearchInput: React.SFC<SearchInputProps> = ({
  value,
  name,
  active,
  placeholder,
  onChange,
}) => (
  <div className={styles.container}>
    <div className={cx(styles.icon, active && styles.iconActive)}>
      <Icon icon={Icons.search} />
    </div>
    <input
      type="search"
      name={name}
      value={value || ''}
      placeholder={placeholder}
      onChange={(evt) => {
        if (onChange) {
          onChange(evt.target.value)
        }
      }}
      className={styles.input}
    />
  </div>
)

export default SearchInput
