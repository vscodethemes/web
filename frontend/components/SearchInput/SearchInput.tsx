import * as React from 'react'
import { Icon, Icons } from '../'
import styles from './SearchInput.styles'

interface SearchInputProps {
  value: string
  placeholder?: string
  onChange?: (value: string) => any
}

const SearchInput: React.SFC<SearchInputProps> = ({
  value,
  placeholder,
  onChange,
}) => (
  <div className={styles.container}>
    <div className={styles.icon}>
      <Icon icon={Icons.search} />
    </div>
    <input
      autoFocus={value.length > 0}
      type="search"
      value={value || ''}
      placeholder={placeholder}
      onChange={evt => {
        if (onChange) {
          onChange(evt.target.value)
        }
      }}
      className={styles.input}
    />
  </div>
)

export default SearchInput
