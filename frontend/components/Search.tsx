import * as algoliasearch from 'algoliasearch'
import * as React from 'react'
import { Theme } from '../../types/static'

export type SortByOptions = 'installs' | 'trending'

interface SearchProps {
  sortBy: SortByOptions
  search: string
  dark: boolean
  light: boolean
  highContrast: boolean
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
  }

  public componentDidMount() {
    const client = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_KEY,
    )

    this.indicies = {
      installs: client.initIndex('themes_by_installs_desc'),
      trending: client.initIndex('themes_by_trending_desc'),
    }

    this.search(this.props)
  }

  public async componentWillReceiveProps(nextProps: SearchProps) {
    if (
      this.props.sortBy !== nextProps.sortBy ||
      this.props.search !== nextProps.search
    ) {
      this.search(nextProps)
    }
  }

  public render() {
    return this.state.themes.map(theme => (
      <pre key={theme.objectID}>
        {JSON.stringify(
          {
            name: theme.name,
            installs: theme.installs,
            rating: theme.rating,
            trendingMonthly: theme.trendingMonthly,
            repositoryOwner: theme.repositoryOwner,
            repository: theme.repository,
            colors: theme.colors,
          },
          null,
          '  ',
        )}
      </pre>
    ))
  }

  private async search(props: SearchProps) {
    const results = await this.indicies[props.sortBy].search({
      query: props.search,
    })
    this.setState({ themes: results.hits })
  }
}

export default Search
