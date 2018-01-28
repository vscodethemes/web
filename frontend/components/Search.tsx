import * as algoliasearch from 'algoliasearch'
import { css } from 'emotion'
import * as React from 'react'
import { SortByOptions, Theme } from '../../types/static'
import theme, { em } from '../theme'

interface SearchProps {
  sortBy: SortByOptions
  search: string
  dark: boolean
  light: boolean
  highContrast: boolean
  children: (theme: Theme) => React.ReactNode
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
    const results = await this.indicies[props.sortBy].search({
      query: props.search,
    })
    this.setState({ themes: results.hits })
  }
}

const styles = {
  container: css({
    paddingTop: em(theme.gutters.lg),
  }),
}

export default Search
