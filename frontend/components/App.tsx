import { css } from 'emotion'
import * as qs from 'query-string'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import theme, { em } from '../theme'
import Checkbox from './Checkbox'
import Input from './Input'
import Search, { SortByOptions } from './Search'
import Tab from './Tab'
import Tabs from './Tabs'

interface SearchParams {
  sortBy: SortByOptions
  search: string
  dark: boolean
  light: boolean
  highContrast: boolean
}

interface QueryParams {
  [key: string]: any
}

class App extends React.Component<RouteComponentProps<{}>, {}> {
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
    const params = this.getSearchParams()

    return (
      <div className={classes.container}>
        <div className={classes.aside}>
          <Tabs>
            <Tab to={{ pathname: '/', search: location.search }} exact={true}>
              Popular
            </Tab>
            <Tab to={{ pathname: '/trending', search: location.search }}>
              Trending
            </Tab>
            <Tab to={{ pathname: '/new', search: location.search }}>New</Tab>
          </Tabs>
          <Input
            type="search"
            icon="search"
            placeholder="Search VSCode Themes"
            value={params.search}
            onChange={search => this.setQueryParams({ ...params, search })}
          />
          <Checkbox
            checked={params.dark}
            label="Dark"
            onChange={dark => this.setQueryParams({ ...params, dark })}
          />
          <Checkbox
            checked={params.light}
            label="Light"
            onChange={light => this.setQueryParams({ ...params, light })}
          />
          <Checkbox
            checked={params.highContrast}
            label="High Contrast"
            onChange={highContrast =>
              this.setQueryParams({ ...params, highContrast })
            }
          />
        </div>
        <div className={classes.main}>
          <Search {...params} />
        </div>
      </div>
    )
  }

  private getSearchParams = (): SearchParams => {
    const { search, pathname } = this.props.location
    const params = qs.parse(search)

    let sortBy: SortByOptions = 'installs'
    if (pathname === '/trending') {
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

  private setQueryParams = (params: QueryParams) => {
    const { location, history } = this.props
    // Format the query string to be more concise.
    Object.keys(params).forEach(key => {
      // Remove falsey values.
      if (!params[key]) {
        delete params[key]
      }
      // Convert true to 1.
      if (params[key] === true) {
        params[key] = 1
      }
    })
    // Update url query params.
    history.push(`${location.pathname}?${qs.stringify(params)}`)
  }
}

const asideWidth = 280

const classes = {
  container: css({
    margin: '0 auto',
    maxWidth: em(840),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  }),

  aside: css({
    position: 'fixed',
    width: em(asideWidth),
    marginTop: em(theme.spacing.xxl),
  }),

  main: css({
    paddingLeft: em(asideWidth + theme.spacing.xxl),
  }),
}

export default withRouter(App)
