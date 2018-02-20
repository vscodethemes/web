import * as qs from 'query-string'
import { SearchParams, SortByOptions } from '../../types/static'

interface Location {
  pathname: string
  search: string
}

export function fromLocation(location: Location) {
  const params = qs.parse(location.search)

  let sortBy: SortByOptions = 'installs'
  if (location.pathname === '/trending/') {
    sortBy = 'trending'
  } else if (location.pathname === '/new/') {
    sortBy = 'new'
  }

  const languages = ['javascript', 'css', 'html']
  let lang
  if (languages.indexOf(params.lang) >= 0) {
    lang = params.lang
  }

  return {
    sortBy,
    search: params.search,
    light: 'light' in params,
    dark: 'dark' in params,
    page: parseInt(params.page, 10) || 1,
    lang,
  }
}
export function toQueryString(params: SearchParams) {
  const queryParams: any = {}

  if (params.search) {
    queryParams.search = params.search
  }
  if (params.light) {
    queryParams.light = 1
  }
  if (params.dark) {
    queryParams.dark = 1
  }
  if (params.lang) {
    queryParams.lang = params.lang
  }
  if (params.page) {
    queryParams.page = params.page
  }

  return qs.stringify(queryParams)
}
