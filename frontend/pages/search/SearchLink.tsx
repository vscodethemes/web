import { withRouter } from 'next/router'
import * as React from 'react'
import linkCallbackProps, { LinkProps } from '../../utils/link'

interface SearchLinkProps {
  q?: string
  page?: number
}

const SearchLink: React.SFC<LinkProps<SearchLinkProps>> = ({
  router,
  children,
  ...query
}) => {
  if (query.q) {
    router.query.q = router.query.q || ''
  }
  if (query.page) {
    router.query.page = router.query.page || 1
  }
  return children(linkCallbackProps(router, { pathname: '/search', query }))
}

export default withRouter(SearchLink)
