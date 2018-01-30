import * as algoliasearch from 'algoliasearch'
import { css } from 'emotion'
import * as React from 'react'
import { SortByOptions, Theme } from '../../types/static'
import theme, { em } from '../theme'

interface FacetHit {
  value: string
  count: number
}

interface SearchProps {
  sortBy: SortByOptions
  search: string
  dark: boolean
  light: boolean
  children: (theme: Theme) => React.ReactNode
  onFacetResults: (totalDark: number, totalLight: number) => any
}

interface SearchState {
  themes: Theme[]
}

class Search extends React.PureComponent<SearchProps, SearchState> {
  public state: SearchState = {
    themes: [],
  }

  private indicies: {
    installs: algoliasearch.AlgoliaIndex
    trending: algoliasearch.AlgoliaIndex
    new: algoliasearch.AlgoliaIndex
  }

  public componentDidMount() {
    const client = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_KEY,
    )

    this.indicies = {
      installs: client.initIndex('themes_by_installs_desc'),
      trending: client.initIndex('themes_by_trending_desc'),
      new: client.initIndex('themes_by_publishDate_desc'),
    }

    Promise.all([this.search(this.props), this.searchFacets(this.props)])
  }

  public componentWillReceiveProps(nextProps: SearchProps) {
    if (this.props.search !== nextProps.search) {
      window.scrollTo(0, 0)
      Promise.all([this.search(nextProps), this.searchFacets(nextProps)])
    } else if (
      this.props.sortBy !== nextProps.sortBy ||
      this.props.dark !== nextProps.dark ||
      this.props.light !== nextProps.light
    ) {
      window.scrollTo(0, 0)
      this.search(nextProps)
    }
  }

  public render() {
    return (
      <div className={styles.container}>
        {this.state.themes.map(this.props.children)}
      </div>
    )
  }

  private async search(props: SearchProps) {
    const types: string[] = []

    if (props.dark) {
      types.push('type:dark')
    }
    if (props.light) {
      types.push('type:light')
    }

    const { hits } = await this.indicies[props.sortBy].search({
      query: props.search,
      filters: types.join(' OR '),
      page: 0,
      hitsPerPage: 10,
      facets: 'type',
    })

    this.setState({ themes: hits })
  }

  private async searchFacets(props: SearchProps) {
    const { facetHits } = await this.indicies[
      props.sortBy
    ].searchForFacetValues({
      query: props.search,
      facetName: 'type',
      facetQuery: '*',
    })

    const dark = facetHits.find((f: FacetHit) => f.value === 'dark')
    const light = facetHits.find((f: FacetHit) => f.value === 'light')
    this.props.onFacetResults(dark.count, light.count)
  }
}

const styles = {
  container: css({
    paddingTop: em(theme.gutters.lg),
  }),
}

export default Search
