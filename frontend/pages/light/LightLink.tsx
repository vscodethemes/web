import { withRouter } from 'next/router'
import * as React from 'react'
import linkCallbackProps, { LinkProps } from '../../utils/link'

interface LightLinkProps {
  page?: number
}

const LightLink: React.SFC<LinkProps<LightLinkProps>> = ({
  router,
  children,
  ...query
}) => {
  if (query.page) {
    router.query.page = router.query.page || 1
  }
  return children(linkCallbackProps(router, { pathname: '/light', query }))
}

export default withRouter(LightLink)
