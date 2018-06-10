import { SearchParams } from '@vscodethemes/types'
import { cx } from 'emotion'
import * as React from 'react'
import SearchLink from '../../pages/SearchPage/SearchLink'
import styles from './TabLink.styles'

interface TabProps {
  active: boolean
  params: SearchParams
  color: string
  onClick: (params: SearchParams) => any
}

const TabLink: React.SFC<TabProps> = ({
  active,
  params,
  color,
  onClick,
  children,
}) => (
  <SearchLink params={params}>
    <a
      className={cx(
        styles.link,
        active && styles.active,
        styles.highlight(color),
      )}
    >
      <div className={styles.text} onClick={() => onClick(params)}>
        {children}
      </div>
    </a>
  </SearchLink>
)

export default TabLink
