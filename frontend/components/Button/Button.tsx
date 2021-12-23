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
  children?: React.ReactNode
}

interface ButtonState {
  isOpen: boolean
}

class Button extends React.Component<ButtonProps, ButtonState> {
  state = {
    isOpen: false,
  }

  dropdownRef = React.createRef<HTMLDivElement>()
  dropdownButtonRef = React.createRef<HTMLButtonElement>()

  handleClickAway = (e: MouseEvent) => {
    if (!this.dropdownRef.current) return
    if (this.dropdownRef.current.contains(e.target as Node)) return
    if (this.dropdownButtonRef.current.contains(e.target as Node)) return

    this.setState({ isOpen: false })
  }

  componentDidMount() {
    const isSplitButton = !!this.props.children
    if (isSplitButton) {
      window.addEventListener('click', this.handleClickAway, true)
    }
  }

  componentWillUnmount() {
    const isSplitButton = !!this.props.children
    if (isSplitButton) {
      window.removeEventListener('click', this.handleClickAway, true)
    }
  }

  render() {
    const {
      label,
      icon,
      href,
      onClick,
      foreground,
      background,
      border,
      children,
    } = this.props

    const { isOpen } = this.state

    const Element = href ? 'a' : 'button'
    const isSplitButton = !!children

    const button = (
      <Element
        className={cx(
          'button',
          styles.button,
          icon && styles.buttonIcon,
          isSplitButton && styles.buttonSplit,
        )}
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

    if (isSplitButton) {
      return (
        <div
          className={cx(styles.buttonGroup, isOpen && styles.buttonGroupOpen)}
        >
          {button}
          <button
            ref={this.dropdownButtonRef}
            className={cx(
              'button',
              styles.button,
              styles.buttonDropdown,
              isOpen && styles.buttonDropdownOpen,
            )}
            onClick={() => this.setState({ isOpen: !isOpen })}
          >
            <Icon icon={Icons.chevronDown} />
          </button>

          <div
            ref={this.dropdownRef}
            className={cx(styles.dropdown, isOpen && styles.dropdownOpen)}
          >
            {children}
          </div>
        </div>
      )
    }

    return button
  }
}

export default Button
