import * as React from 'react'
import { LinkProps } from '../../utils/createLink'
import generatePages from './generatePages'
import Page from './Page'
import styles from './Pagination.styles'

interface PaginationProps {
  page: number
  totalPages: number
  Link: React.ComponentType<LinkProps>
}

const maxVisiblePages = 7

const Pagination: React.SFC<PaginationProps> = ({ page, totalPages, Link }) => {
  const pages = generatePages(totalPages, page, maxVisiblePages)

  return (
    <div className={styles.pagination}>
      {pages.map((currentPage, index) => {
        // Show skip backward icon if second page is not adjacent to the third page.
        const isSkipBackward =
          totalPages > 3 && index === 1 && pages[1] !== pages[2] - 1
        // Show skip forward icon if the second last page is not adjacent to the last page.
        const isSkipForward =
          totalPages > 3 &&
          index === maxVisiblePages - 2 &&
          pages[maxVisiblePages - 2] !== pages[maxVisiblePages - 3] + 1

        return (
          <Link key={currentPage} page={currentPage}>
            {linkProps => (
              <Page
                page={currentPage}
                skipBackward={isSkipBackward}
                skipForward={isSkipForward}
                {...linkProps}
              />
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default Pagination
