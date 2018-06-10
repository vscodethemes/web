import { SearchParams } from '@vscodethemes/types'
import * as React from 'react'
import generatePages from './generatePages'
import PageLink from './PageLink'
import styles from './Pagination.styles'

interface PaginationProps {
  totalPages: number
  params: SearchParams
  onClick: (params: SearchParams) => any
}

const maxVisiblePages = 7

const Pagination: React.SFC<PaginationProps> = ({
  totalPages,
  params,
  onClick,
}) => {
  const pages = generatePages(totalPages, params.page, maxVisiblePages)

  return (
    <div className={styles.pagination}>
      {pages.map((page, index) => {
        // Show skip backward icon if second page is not adjacent to the third page.
        const isSkipBackward =
          totalPages > 3 && index === 1 && pages[1] !== pages[2] - 1
        // Show skip forward icon if the second last page is not adjacent to the last page.
        const isSkipForward =
          totalPages > 3 &&
          index === maxVisiblePages - 2 &&
          pages[maxVisiblePages - 2] !== pages[maxVisiblePages - 3] + 1

        return (
          <PageLink
            key={page}
            page={page}
            params={params}
            skipBackward={isSkipBackward}
            skipForward={isSkipForward}
            onClick={onClick}
          />
        )
      })}
    </div>
  )
}

export default Pagination
