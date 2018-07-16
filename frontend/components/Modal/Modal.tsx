import * as React from 'react'
import styles from './Modal.styles'

interface ModalProps {
  onEscape: () => any
}

class Modal extends React.Component<ModalProps, {}> {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      this.props.onEscape()
    }
  }

  render() {
    const { children } = this.props
    return (
      <div className={styles.modal}>
        <div className={styles.contents}>{children}</div>
      </div>
    )
  }
}

export default Modal
