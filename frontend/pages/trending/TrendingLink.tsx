import { withRouter } from 'next/router'
import * as React from 'react'
import linkCallbackProps, { LinkProps } from '../../utils/link'

interface TrendingLinkProps {
  page?: number
}

const TrendingLink: React.SFC<LinkProps<TrendingLinkProps>> = ({
  router,
  children,
  ...query
}) => {
  if (query.page) {
    router.query.page = router.query.page || 1
  }
  return children(linkCallbackProps(router, { pathname: '/trending', query }))
}

export default withRouter(TrendingLink)
