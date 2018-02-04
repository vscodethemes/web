import * as algoliasearch from 'algoliasearch'
import { css } from 'emotion'
import * as React from 'react'
import { SortByOptions, Theme } from '../../types/static'
import theme, { em } from '../theme'
import generatePlaceholderThemes from '../utils/generatePlaceholderThemes'
import { containerGutter, mainMaxWidth } from './App.styles'

interface FacetHit {
  value: string
  count: number
}

interface SearchProps {
  sortBy: SortByOptions
  search: string
  dark: boolean
  light: boolean
  page: number
  renderTheme: (theme: Theme) => React.ReactNode
  onFacetResults: (totalDark: number, totalLight: number) => any
  onPages: (totalPages: number) => any
}

interface SearchState {
  themes: Theme[]
}

const hitsPerPage = 12
const placeholders = generatePlaceholderThemes(hitsPerPage)

class Search extends React.PureComponent<SearchProps, SearchState> {
  public state: SearchState = {
    themes: placeholders,
  }

  private indicies: {
    installs: algoliasearch.AlgoliaIndex
    trending: algoliasearch.AlgoliaIndex
    new: algoliasearch.AlgoliaIndex
  }

  private timeout: NodeJS.Timer

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
      this.props.light !== nextProps.light ||
      this.props.page !== nextProps.page
    ) {
      window.scrollTo(0, 0)
      this.search(nextProps)
    }
  }

  public render() {
    const { renderTheme, children } = this.props
    const { themes } = this.state

    return (
      <div className={classes.container}>
        {themes.map(renderTheme)}
        <div className={classes.footer}>{children}</div>
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

    try {
      this.startPlaceholdersTimer()
      const { hits, nbPages } = await this.indicies[props.sortBy].search({
        query: props.search,
        filters: types.join(' OR '),
        page: props.page - 1,
        hitsPerPage,
        facets: 'type',
      })
      this.stopPlaceholdersTimer()
      this.setState({ themes: hits })
      this.props.onPages(nbPages)
    } catch (err) {
      throw new Error(`Error searching: ${err.message}.`)
    }
  }

  private async searchFacets(props: SearchProps) {
    try {
      const { facetHits } = await this.indicies[
        props.sortBy
      ].searchForFacetValues({
        query: props.search,
        facetName: 'type',
        facetQuery: '*',
      })

      const dark = facetHits.find((f: FacetHit) => f.value === 'dark')
      const light = facetHits.find((f: FacetHit) => f.value === 'light')
      this.props.onFacetResults(dark ? dark.count : 0, light ? light.count : 0)
    } catch (err) {
      throw new Error(`Error searching facets: ${err.message}.`)
    }
  }

  private startPlaceholdersTimer() {
    this.timeout = setTimeout(() => {
      this.setState({ themes: placeholders })
    }, 100)
  }

  private stopPlaceholdersTimer() {
    clearTimeout(this.timeout)
  }
}

const classes = {
  container: css({
    paddingTop: em(theme.gutters.lg),
    [`@media (max-width: ${mainMaxWidth + containerGutter * 2}px)`]: {
      paddingTop: em(theme.gutters.md),
    },
  }),

  footer: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
}

export default Search
