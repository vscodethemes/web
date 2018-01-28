import { css } from 'emotion'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter } from 'react-router'
import { SearchParams } from '../../types/static'
import theme, { em } from '../theme'
import * as searchParams from '../utils/searchParams'
import Checkbox from './Checkbox'
import Input from './Input'
import Search from './Search'
import Tab from './Tab'
import Tabs from './Tabs'

const titles: { [key: string]: string } = {
  '/': 'Popular',
  '/trending': 'Trending',
  '/new': 'New',
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
    const params = searchParams.fromLocation(location)

    console.log('path', location.pathname)

    return (
      <div className={classes.container}>
        <Helmet>
          <title>{titles[location.pathname]}</title>
        </Helmet>
        <div className={classes.aside}>
          <Tabs>
            <Tab
              color="#B8E63B"
              to={{ pathname: '/', search: location.search }}
              exact={true}
            >
              Popular
            </Tab>
            <Tab
              color="#880055"
              to={{ pathname: '/trending', search: location.search }}
            >
              Trending
            </Tab>
            <Tab
              color="#E70258"
              to={{ pathname: '/new', search: location.search }}
            >
              New
            </Tab>
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

  private setQueryParams = (params: SearchParams) => {
    const { location, history } = this.props
    const querystring = searchParams.toQueryString(params)
    history.push(`${location.pathname}?${querystring}`)
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
    left: '50%',
    width: em(asideWidth),
    marginTop: em(theme.gutters.xl),
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
