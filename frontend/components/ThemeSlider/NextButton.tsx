import { cx } from 'emotion'
import * as React from 'react'
import Icon from '../Icon'
import styles from './NextButton.styles'

interface NextButtonProps {
  hide: boolean
  onClick: () => any
}

const NextButton: React.SFC<NextButtonProps> = ({ hide = false, onClick }) => (
  <button
    className={cx('next', styles.button, hide && styles.hide)}
    onClick={onClick}
  >
    <Icon icon="chevronRight" className={cx('icon', styles.icon)} />
  </button>
)

export default NextButton
