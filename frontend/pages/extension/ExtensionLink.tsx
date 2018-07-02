import { withRouter } from 'next/router'
import * as React from 'react'
import linkCallbackProps, { LinkProps } from '../../utils/link'

interface ExtensionLinkProps {
  publisherName: string
  extensionName: string
}

const ExtensionLink: React.SFC<LinkProps<ExtensionLinkProps>> = ({
  router,
  children,
  ...query
}) =>
  children(
    linkCallbackProps(
      router,
      { pathname: '/extension', query },
      { pathname: `/e/${query.publisherName}.${query.extensionName}` },
    ),
  )

export default withRouter(ExtensionLink)
