import * as React from 'react'
import styles from './DropdownItem.styles'

interface DropdownItemProps {
  label: string
  href?: string
  target?: string
  onClick?: () => void
}

const DropdownItem: React.SFC<DropdownItemProps> = ({
  label,
  href,
  target,
  onClick,
}) => {
  const Element = href ? 'a' : 'button'

  return (
    <Element
      className={styles.item}
      href={href}
      target={target}
      onClick={onClick}
    >
      {label}
    </Element>
  )
}

export default DropdownItem
