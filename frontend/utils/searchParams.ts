import * as qs from 'query-string'
import { SearchParams, SortByOptions } from '../../types/static'

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

  return {
    sortBy,
    search: params.search,
    light: 'light' in params,
    dark: 'dark' in params,
    highContrast: 'highContrast' in params,
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
  if (params.highContrast) {
    queryParams.highContrast = 1
  }

  return qs.stringify(queryParams)
}
