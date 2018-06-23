import { cx } from 'emotion'
import * as React from 'react'
import Icon, { Icons } from '../Icon'
import styles from './Page.styles'

interface Props {
  page: number
  skipBackward: boolean
  skipForward: boolean
  href: string
  active: boolean
  onClick: (e: any) => any
}

const Page: React.SFC<Props> = ({
  page,
  skipBackward,
  skipForward,
  href,
  active,
  onClick,
}) => {
  let contents: React.ReactNode = null

  if (skipBackward) {
    contents = <Icon className={styles.icon} icon={Icons.chevronDoubleLeft} />
  } else if (skipForward) {
    contents = <Icon className={styles.icon} icon={Icons.chevronDoubleRight} />
  } else {
    contents = page
  }

  return (
    <a
      className={cx(styles.page, active && styles.active)}
      href={href}
      onClick={onClick}
    >
      {contents}
    </a>
  )
}

export default Page
