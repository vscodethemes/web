import * as React from 'react'
import styles from './Modal.styles'

interface ModalProps {
  onEscape: () => any
}

class Modal extends React.Component<ModalProps, {}> {
  componentDidMount() {
    // Exit modal on esc.
    document.addEventListener('keydown', this.handleKeyDown, false)
    // Disable scroll when open.
    document.body.classList.add(styles.body)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.body.classList.remove(styles.body)
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
