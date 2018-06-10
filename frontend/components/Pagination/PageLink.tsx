import { SearchParams } from '@vscodethemes/types'
import { cx } from 'emotion'
import * as React from 'react'
import SearchLink from '../../pages/SearchPage/SearchLink'
import Icon from '../Icon'
import styles from './PageLink.styles'

interface Props {
  page: number
  params: SearchParams
  skipBackward: boolean
  skipForward: boolean
  onClick: (params: SearchParams) => any
}

const PageLink: React.SFC<Props> = ({
  page,
  params,
  skipBackward,
  skipForward,
  onClick,
}) => {
  const isActive = params.page === page && !skipBackward && !skipForward
  let contents: React.ReactNode = null

  if (skipBackward) {
    contents = <Icon className={styles.icon} icon="chevronDoubleLeft" />
  } else if (skipForward) {
    contents = <Icon className={styles.icon} icon="chevronDoubleRight" />
  } else {
    contents = page
  }

  return (
    <SearchLink params={{ ...params, page }}>
      <a className={cx(styles.page, isActive && styles.active)}>
        <div
          className={styles.contents}
          onClick={() => onClick({ ...params, page })}
        >
          {contents}
        </div>
      </a>
    </SearchLink>
  )
}

export default PageLink
