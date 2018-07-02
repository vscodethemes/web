import { withRouter } from 'next/router'
import * as React from 'react'
import linkCallbackProps, { LinkProps } from '../../utils/link'

const HomeLink: React.SFC<LinkProps<{}>> = ({ router, children, ...query }) => {
  return children(linkCallbackProps(router, { pathname: '/', query }))
}

export default withRouter(HomeLink)
