import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter } from 'react-router'
import { SearchParams, Theme } from '../../types/static'
import theme from '../theme'
import * as searchParams from '../utils/searchParams'
import * as classes from './App.styles'
import Checkbox from './Checkbox'
import Facet from './Facet'
import Footer from './Footer'
import Input from './Input'
import Logo from './Logo'
import Pagination from './Pagination'
import Search from './Search'
import Tab from './Tab'
import Tabs from './Tabs'
import ThemePreview from './ThemePreview'

const titles: { [key: string]: string } = {
  '/': 'Popular | VSCode Themes',
  '/trending': 'Trending | VSCode Themes',
  '/new': 'New | VSCode Themes',
}

interface AppState {
  totalDark: number | null
  totalLight: number | null
  totalPages: number | null
}

class App extends React.Component<RouteComponentProps<{}>, AppState> {
  public state: AppState = {
    totalDark: null,
    totalLight: null,
    totalPages: null,
  }

  public componentDidMount() {
    // The query string does not exist when server-side rendering
    // so we need to force update if it exists in order for the
    // form to be sync'd.
    if (this.props.location.search) {
      this.forceUpdate()
    }
  }

  public render(): React.ReactNode {
    const { location } = this.props
    const { totalDark, totalLight, totalPages } = this.state
    const params = searchParams.fromLocation(location)

    return (
      <React.Fragment>
        <div className={classes.container}>
          <Helmet>
            <title>{titles[location.pathname]}</title>
          </Helmet>
          <div className={classes.header}>
            <Logo />
          </div>
          <div className={classes.aside}>
            <div className={classes.sortby}>
              <Tabs>
                <Tab
                  color={theme.colors.palette[1]}
                  to={{ pathname: '/', search: location.search }}
                  exact={true}
                >
                  Popular
                </Tab>
                <Tab
                  color={theme.colors.palette[2]}
                  to={{ pathname: '/trending', search: location.search }}
                >
                  Trending
                </Tab>
                <Tab
                  color={theme.colors.palette[3]}
                  to={{ pathname: '/new', search: location.search }}
                >
                  New
                </Tab>
              </Tabs>
            </div>
            <div className={classes.filters}>
              <Input
                type="search"
                icon="search"
                placeholder="Search themes (i.e. monokai)"
                value={params.search}
                onChange={search =>
                  this.setQueryParams({ ...params, search, page: 1 })
                }
              />
              <div className={classes.facets}>
                <Checkbox
                  checked={params.dark}
                  onChange={dark =>
                    this.setQueryParams({ ...params, dark, page: 1 })
                  }
                >
                  Dark
                  {totalDark !== null && <Facet>| {totalDark}</Facet>}
                </Checkbox>
                <Checkbox
                  checked={params.light}
                  onChange={light =>
                    this.setQueryParams({ ...params, light, page: 1 })
                  }
                >
                  Light
                  {totalLight !== null && <Facet>| {totalLight}</Facet>}
                </Checkbox>
              </div>
            </div>
          </div>
          <div className={classes.main}>
            <Search
              {...params}
              onFacetResults={this.setFacetResults}
              onPages={this.setTotalPages}
              onClear={() => this.setQueryParams({ ...params, search: '' })}
              renderTheme={(t: Theme) => (
                <ThemePreview
                  key={t.objectID}
                  theme={t}
                  language={params.lang}
                  onLanguage={lang => this.setQueryParams({ ...params, lang })}
                />
              )}
            >
              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  page={params.page}
                  onPage={page => this.setQueryParams({ ...params, page })}
                />
              )}
            </Search>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }

  private setQueryParams = (params: SearchParams) => {
    const { location, history } = this.props
    const querystring = searchParams.toQueryString(params)
    history.push(`${location.pathname}?${querystring}`)
  }

  private setFacetResults = (totalDark: number, totalLight: number) => {
    this.setState({ totalDark, totalLight })
  }

  private setTotalPages = (totalPages: number) => {
    this.setState({ totalPages })
  }
}

export default withRouter(App)
