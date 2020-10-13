import { SingletonRouter } from 'next/router'
import * as qs from 'querystring'
import theme from '../theme'

interface LinkCallbackProps {
  href: string
  active: boolean
  onClick: (e: any) => any
}

interface UrlObject {
  pathname: string
  query?: any
}

export type LinkProps<T> = T & {
  router?: SingletonRouter
  children: (linkProps: LinkCallbackProps) => any
}

const createUrl = (urlObject: UrlObject) => {
  const querystring = qs.stringify(urlObject.query || {})
  return `${urlObject.pathname}${querystring ? `?${querystring}` : ''}`
}

const isUrlEqual = (href: UrlObject, router: UrlObject) => {
  const isPathnameEqual = href.pathname === router.pathname

  if (Object.keys(href.query).length) {
    const isQueryEqual = Object.keys(href.query).every(
      (param) => String(href.query[param]) === String(router.query[param]),
    )
    return isPathnameEqual && isQueryEqual
  }

  return isPathnameEqual
}

export default function linkCallbackProps(
  router: SingletonRouter,
  href: UrlObject,
  as: UrlObject = href,
  resetScroll = true,
): LinkCallbackProps {
  return {
    href: createUrl(as),
    active: isUrlEqual(href, router),
    onClick: async (e: MouseEvent) => {
      // On mobile, specifically iOS, the history.push experience isn't great
      // out of the box. The scroll position doesn't reset when navigating and
      // you can't prevent background scroll on modals. More info on scroll
      // reseting in NextJS: https://github.com/zeit/next.js/issues/1309
      const isMobile = window.matchMedia(
        theme.breakpoints.mobile.replace('@media ', ''),
      ).matches

      if (isMobile) return

      e.preventDefault()

      await router.push(href, as)
      if (resetScroll) {
        window.scrollTo(0, 0)
      }
    },
  }
}
