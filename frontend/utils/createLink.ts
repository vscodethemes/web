import { SingletonRouter, withRouter } from 'next/router'
import * as qs from 'querystring'
import * as React from 'react'

interface LinkCallbackProps {
  href: string
  active: boolean
  onClick: (e: any) => any
}

interface Link {
  page?: number
  router?: SingletonRouter
  children: (linkProps: LinkCallbackProps) => any
}

export default function createLink(pathname: string) {
  const LinkComponent: React.SFC<Link> = ({ page, router, children }) => {
    const active = router.pathname === pathname
    const query: any = {}

    if (page) {
      query.page = page
    }

    const querystring = qs.stringify(query)
    const href = `${pathname}${querystring ? `?${querystring}` : ''}`

    return children({
      href,
      active,
      onClick: (e: MouseEvent) => {
        e.preventDefault()
        router.push({ pathname, query })
      },
    })
  }

  return withRouter(LinkComponent)
}
