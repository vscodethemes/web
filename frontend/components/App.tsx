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

  private setQueryParams = (params: SearchParams) => {
    const { location, history } = this.props
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

    history.push(`${location.pathname}?${qs.stringify(queryParams)}`)
  }
}

const asideWidth = 280
const mainWidth = 420
const containerGutter = theme.gutters.md
const asideGutter = theme.gutters.xl
const containerWidth =
  asideWidth + asideGutter + mainWidth + containerGutter * 2
const breakpoints = [containerWidth]

const classes = {
  container: css({
    width: '100%',
    maxWidth: em(containerWidth),
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: em(containerGutter),
    paddingRight: em(containerGutter),
  }),

  aside: css({
    position: 'fixed',
    top: theme.gutters.xxl,
    left: '50%',
    width: em(asideWidth),
    marginLeft: em(-asideWidth - asideGutter - asideGutter / 2),

    [`@media (max-width: ${breakpoints[0]}px)`]: {
      left: em(containerGutter),
      marginLeft: 0,
    },
  }),

  main: css({
    flex: 1,
    maxWidth: em(mainWidth),
    [`@media (max-width: ${breakpoints[0]}px)`]: {
      marginLeft: em(asideWidth + containerGutter),
    },
  }),
}

export default withRouter(App)
