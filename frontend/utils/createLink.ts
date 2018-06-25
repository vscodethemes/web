import { SingletonRouter, withRouter } from 'next/router'
import * as qs from 'querystring'
import * as React from 'react'

interface LinkCallbackProps {
  href: string
  active: boolean
  onClick: (e: any) => any
}

export interface LinkProps {
  q?: string
  page?: number
  router?: SingletonRouter
  children: (linkProps: LinkCallbackProps) => any
}

const createUrl = (pathname: string, query: any = {}) => {
  const querystring = qs.stringify(query)
  return `${pathname}${querystring ? `?${querystring}` : ''}`
}

export default function createLink(pathname: string) {
  const LinkComponent: React.SFC<LinkProps> = ({
    q,
    page,
    router,
    children,
  }) => {
    const query: any = {}
    const routerPathname = router.pathname
    const routerQuery = router.query

    if (q) {
      query.q = q
      routerQuery.q = routerQuery.q || ''
    }

    if (page) {
      query.page = page
      routerQuery.page = routerQuery.page || 1
    }

    const href = createUrl(pathname, query)
    const active = Object.keys(query).length
      ? href === createUrl(routerPathname, routerQuery)
      : href === createUrl(routerPathname)

    return children({
      href,
      active,
      onClick: async (e: MouseEvent) => {
        e.preventDefault()
        await router.push({ pathname, query })
        window.scrollTo(0, 0)
      },
    })
  }

  return withRouter(LinkComponent)
}
