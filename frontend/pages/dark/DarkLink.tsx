import { withRouter } from 'next/router'
import * as React from 'react'
import linkCallbackProps, { LinkProps } from '../../utils/link'

interface DarkLinkProps {
  page?: number
}

const DarkLink: React.SFC<LinkProps<DarkLinkProps>> = ({
  router,
  children,
  ...query
}) => {
  if (query.page) {
    router.query.page = router.query.page || 1
  }
  return children(linkCallbackProps(router, { pathname: '/dark', query }))
}

export default withRouter(DarkLink)
