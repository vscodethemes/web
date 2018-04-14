import {
  LanguageOptions,
  SearchParams,
  SortByOptions,
  Theme,
} from '@vscodethemes/types'
import { Context } from 'next'
import * as React from 'react'
import { search } from '../clients/algolia'

interface Props {
  params: SearchParams
  results: Theme[]
}

export default class SearchPage extends React.Component<Props> {
  static async getInitialProps(ctx: Context): Promise<Props> {
    const query = ctx.query
    const params: SearchParams = {
      sortBy: SortByOptions.installs,
      search: query.search,
      light: 'light' in query,
      dark: 'dark' in query,
      page: parseInt(query.page, 10) || 1,
      perPage: parseInt(query.perPage, 10) || 12,
      lang: LanguageOptions.javascript,
    }

    if (query.sortBy === SortByOptions.trending) {
      params.sortBy = SortByOptions.trending
    } else if (query.sortBy === SortByOptions.new) {
      params.sortBy = SortByOptions.new
    }

    if (query.lang === LanguageOptions.html) {
      params.lang = LanguageOptions.html
    } else if (query.lang === LanguageOptions.css) {
      params.lang = LanguageOptions.css
    }

    const results = await search(params)
    return { results, params }
  }

  render() {
    return <pre>{JSON.stringify(this.props.results, null, '  ')}</pre>
  }
}
