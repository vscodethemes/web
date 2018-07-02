import { cx } from 'emotion'
import * as React from 'react'
import { Icon, Icons } from '../'
import styles from './Button.styles'

interface ButtonProps {
  label: string
  icon?: Icons
  href?: string
  onClick?: (e: any) => any
  foreground?: string
  background?: string
  border?: string
}

const Button: React.SFC<ButtonProps> = ({
  label,
  icon,
  href,
  onClick,
  foreground,
  background,
  border,
}) => {
  const Element = href ? 'a' : 'button'
  return (
    <Element
      className={cx(styles.button, icon && styles.buttonIcon)}
      href={href}
      onClick={onClick}
      style={{
        color: foreground,
        backgroundColor: background,
        border: border && `1px solid ${border}`,
      }}
    >
      {icon && <Icon icon={icon} />}
      {label}
    </Element>
  )
}

export default Button
