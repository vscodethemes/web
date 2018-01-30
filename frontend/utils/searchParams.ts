import * as qs from 'query-string'
import {
  LanguageOptions,
  SearchParams,
  SortByOptions,
} from '../../types/static'

interface Location {
  pathname: string
  search: string
}

export function fromLocation(location: Location) {
  const params = qs.parse(location.search)

  let sortBy: SortByOptions = 'installs'
  if (location.pathname === '/trending') {
    sortBy = 'trending'
  }

  const languages = ['javascript', 'css', 'html']
  let lang: LanguageOptions = 'javascript'
  if (languages.indexOf(params.lang) >= 0) {
    lang = params.lang
  }

  return {
    sortBy,
    search: params.search,
    light: 'light' in params,
    dark: 'dark' in params,
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

  return qs.stringify(queryParams)
}
