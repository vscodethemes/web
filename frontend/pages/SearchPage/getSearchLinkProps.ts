import { SortByOptions } from '@vscodethemes/types'
import { defaultSearchParams } from '../../constants'

export default function getSearchLinkProps(params: any) {
  const href: any = { pathname: '/', query: {} }
  const as: any = { pathname: '/', query: {} }

  if (params.sortBy && params.sortBy !== SortByOptions.installs) {
    as.pathname = `/${params.sortBy}`
  }

  Object.keys(params).forEach(key => {
    if (key === 'light' && params[key]) {
      as.query.light = 1
    } else if (key === 'dark' && params[key]) {
      as.query.dark = 1
    } else if (key === 'search' && params[key]) {
      as.query.search = params[key]
    } else if (key === 'lang' && params[key] !== defaultSearchParams[key]) {
      as.query.lang = params[key]
    } else if (key === 'page' && params[key] !== defaultSearchParams[key]) {
      as.query.page = params[key]
    } else if (key === 'perPage' && params[key] !== defaultSearchParams[key]) {
      as.query.perPage = params[key]
    }

    // Don't add boolean false to query string because it gets converted
    // to the string "false", which is truthy.
    if (typeof params[key] !== 'boolean' || params[key]) {
      href.query[key] = params[key]
    }
  })

  return { href, as }
}
