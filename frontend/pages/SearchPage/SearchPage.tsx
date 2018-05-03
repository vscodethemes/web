import {
  LanguageOptions,
  SearchParams,
  SortByOptions,
  Theme,
} from '@vscodethemes/types'
import { Context } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import * as React from 'react'
import * as algolia from '../../clients/algolia'
import {
  App,
  Checkbox,
  Facet,
  Input,
  Pagination,
  SearchResults,
  TabLink,
  Tabs,
} from '../../components'
import { defaultSearchParams } from '../../constants'
import theme from '../../theme'
import generatePlaceholders from '../../utils/generatePlaceholders'
import * as userAgent from '../../utils/userAgent'
import getSearchLinkProps from './getSearchLinkProps'
import { classes } from './SearchPage.styles'

interface SearchPageProps {
  params: SearchParams
  results: Theme[]
  totalPages: number
  totalDark: number
  totalLight: number
  isDesktop: boolean
}

interface SerachPageState {
  params: SearchParams
  isLoading: boolean
}

const titles = {
  installs: 'VSCode Themes | Popular',
  trending: 'VSCode Themes | Trending',
  new: 'VSCode Themes | New',
}

export default class SearchPage extends React.Component<
  SearchPageProps,
  SerachPageState
> {
  static async getInitialProps(ctx: Context): Promise<SearchPageProps> {
    const query = ctx.query
    const params: SearchParams = {
      sortBy: SortByOptions.installs || defaultSearchParams.sortBy,
      search: query.search || defaultSearchParams.search,
      light: Boolean(query.light),
      dark: Boolean(query.dark),
      page: parseInt(query.page, 10) || defaultSearchParams.page,
      perPage: parseInt(query.perPage, 10) || defaultSearchParams.perPage,
      lang: query.lang || defaultSearchParams.lang,
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

    const [
      { results, totalPages },
      { totalDark, totalLight },
    ] = await Promise.all([
      algolia.search(params),
      algolia.searchFacets(params),
    ])

    return {
      results,
      totalPages,
      totalDark,
      totalLight,
      params,
      isDesktop: userAgent.isDesktop(ctx.req),
    }
  }

  state = {
    params: this.props.params,
    isLoading: false,
  }

  loadingTimeout: number
  resetScrollPosition = false

  componentDidMount() {
    Router.onRouteChangeStart = () => {
      // Show loading state if fetching initial props takes
      // longer than 150ms
      window.clearTimeout(this.loadingTimeout)
      this.loadingTimeout = window.setTimeout(() => {
        this.setState({ isLoading: true })
      }, 150)
    }
    Router.onRouteChangeComplete = () => {
      window.clearTimeout(this.loadingTimeout)
      this.setState({ isLoading: false })
    }
  }

  componentWillUnmount() {
    Router.onRouteChangeStart = null
    Router.onRouteChangeComplete = null
  }

  // setParams is used to immediately update controlled components
  // (ie. search input) before fetching data for the next route.
  setParams = (params: any) => {
    this.setState({ params })
  }

  // Pushes new search parameters onto the query string. The
  // URL isn't updated until after getInitialProps resolves.
  setQuery = async (params: any, preventSearch: boolean = false) => {
    this.setParams(params)
    const { href, as } = getSearchLinkProps(params)
    if (!preventSearch) {
      window.scrollTo(0, 0)
    }
    await Router.push(href, as, { shallow: preventSearch })
  }

  render() {
    const { results, totalPages, totalDark, totalLight, isDesktop } = this.props
    const { params, isLoading } = this.state
    const themes = isLoading ? generatePlaceholders(params.perPage) : results
    return (
      <App
        isDesktop={isDesktop}
        onLogoClick={() => this.setParams(defaultSearchParams)}
      >
        <Head>
          <title>{titles[params.sortBy]}</title>
        </Head>
        <div className={classes.container}>
          <div className={classes.aside}>
            <div className={classes.sortBy}>
              <Tabs>
                <TabLink
                  active={params.sortBy === SortByOptions.installs}
                  params={{
                    ...params,
                    sortBy: SortByOptions.installs,
                    page: 1,
                  }}
                  color={theme.colors.palette[1]}
                  onClick={this.setParams}
                >
                  Popular
                </TabLink>
                <TabLink
                  active={params.sortBy === SortByOptions.trending}
                  params={{
                    ...params,
                    sortBy: SortByOptions.trending,
                    page: 1,
                  }}
                  color={theme.colors.palette[2]}
                  onClick={this.setParams}
                >
                  Trending
                </TabLink>
                <TabLink
                  active={params.sortBy === SortByOptions.new}
                  params={{ ...params, sortBy: SortByOptions.new, page: 1 }}
                  color={theme.colors.palette[3]}
                  onClick={this.setParams}
                >
                  New
                </TabLink>
              </Tabs>
            </div>
            <div className={classes.filters}>
              <Input
                type="search"
                icon="search"
                placeholder="Search themes (i.e. monokai)"
                value={params.search}
                onChange={search =>
                  this.setQuery({ ...params, search, page: 1 })
                }
              />
              <div className={classes.facets}>
                <Checkbox
                  checked={params.dark}
                  onChange={dark => this.setQuery({ ...params, dark, page: 1 })}
                >
                  Dark
                  {totalDark !== null && <Facet>| {totalDark}</Facet>}
                </Checkbox>
                <Checkbox
                  checked={params.light}
                  onChange={light =>
                    this.setQuery({ ...params, light, page: 1 })
                  }
                >
                  Light
                  {totalLight !== null && <Facet>| {totalLight}</Facet>}
                </Checkbox>
              </div>
            </div>
          </div>
          <div className={classes.main}>
            <SearchResults
              params={params}
              themes={themes}
              onLanguage={lang => this.setQuery({ ...params, lang }, true)}
              onClear={() => this.setQuery({ ...params, search: '' })}
            />
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                params={params}
                onClick={this.setParams}
              />
            )}
          </div>
        </div>
      </App>
    )
  }
}
