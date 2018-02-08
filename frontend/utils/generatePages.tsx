/**
 * Generates a set of pages for the provided total pages. Ensures
 * the active page is centered unless we can't fill the specified number
 * of visible pages. Returns links to the next set of pages when we
 * can skip forward or backwards. Links will either be inserted as the
 * second page or the second-last page. This is a naive implementation and
 * really only works well when the number of visible pages is 7.
 */
export default function generatePages(
  totalPages: number,
  page: number,
  maxVisiblePages: number,
) {
  if (totalPages <= 1) {
    return []
  }

  if (totalPages <= maxVisiblePages) {
    return fill(1, totalPages)
  }
  // Ensure active page is centered unless we can't fill the
  // number of pages to display.
  //   ie. [1*, 2, 3] -> [1, 2*, 3] ->  [2, 3*, 4] ->  [2, 3, 4*]
  let startPage = Math.max(page - Math.floor(maxVisiblePages / 2), 1)
  let endPage = startPage + (maxVisiblePages - 1)
  // If we've gone over the total number of pages, reset the active page
  // such that the end page is the total number of pages.
  if (endPage > totalPages) {
    startPage = Math.max(startPage - (endPage - totalPages), 1)
    endPage = startPage + (maxVisiblePages - 1)
  }
  // Initialize the page set from the start page to the end page.
  const pages: number[] = fill(startPage, endPage)
  // The first page should always be the first page and the last
  // page should always be the last page.
  pages[0] = 1
  pages[pages.length - 1] = totalPages
  // Skip backwards two pages if the first page isn't adjacent
  // to the second page.
  if (pages[1] !== pages[0] + 1) {
    pages[1] = pages[2] - 2
  }
  // Skip forward two pages if the second last page isn't adjacent
  // to the third last page.
  if (pages[pages.length - 2] !== pages[pages.length - 1] - 1) {
    pages[pages.length - 2] = pages[pages.length - 3] + 2
  }

  return pages
}

function fill(from: number, to: number) {
  const array: number[] = []
  for (let i = from; i <= to; i += 1) {
    array.push(i)
  }
  return array
}
