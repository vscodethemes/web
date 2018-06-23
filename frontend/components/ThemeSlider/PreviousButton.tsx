import { cx } from 'emotion'
import * as React from 'react'
import Icon, { Icons } from '../Icon'
import styles from './PreviousButton.styles'

interface PreviousButtonProps {
  hide: boolean
  onClick: () => any
}

const PreviousButton: React.SFC<PreviousButtonProps> = ({
  hide = false,
  onClick,
}) => (
  <button
    className={cx('previous', styles.button, hide && styles.hide)}
    onClick={onClick}
  >
    <Icon icon={Icons.chevronLeft} className={cx('icon', styles.icon)} />
  </button>
)

export default PreviousButton
