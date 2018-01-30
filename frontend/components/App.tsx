import { css } from 'emotion'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter } from 'react-router'
import { SearchParams, Theme } from '../../types/static'
import theme, { em } from '../theme'
import * as searchParams from '../utils/searchParams'
import AlgoliaLogo from './AlgoliaLogo'
import Checkbox from './Checkbox'
import Input from './Input'
import Logo from './Logo'
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
}

class App extends React.Component<RouteComponentProps<{}>, AppState> {
  public state: AppState = {
    totalDark: null,
    totalLight: null,
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
    const { totalDark, totalLight } = this.state
    const params = searchParams.fromLocation(location)

    return (
      <div className={classes.container}>
        <Helmet>
          <title>{titles[location.pathname]}</title>
        </Helmet>
        <div className={classes.header}>
          <Logo />
        </div>
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
            onChange={dark => this.setQueryParams({ ...params, dark })}
          >
            Dark
            {totalDark !== null && (
              <span className={classes.facet}>| {totalDark}</span>
            )}
          </Checkbox>
          <Checkbox
            checked={params.light}
            onChange={light => this.setQueryParams({ ...params, light })}
          >
            Light
            {totalLight !== null && (
              <span className={classes.facet}>| {totalLight}</span>
            )}
          </Checkbox>
        </div>
        <div className={classes.main}>
          <Search {...params} onFacetResults={this.setFacetResults}>
            {(t: Theme) => (
              <ThemePreview
                key={t.objectID}
                {...t}
                language={params.lang}
                onLanguage={lang => this.setQueryParams({ ...params, lang })}
              />
            )}
          </Search>
          <AlgoliaLogo />
        </div>
      </div>
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
}

const headerHeight = 34
const asideWidth = 260
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
    paddingTop: em(headerHeight),
    paddingLeft: em(containerGutter),
    paddingRight: em(containerGutter),
  }),

  header: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: em(headerHeight),
    borderBottom: `1px solid ${theme.colors.inputBorder}`,
  }),

  aside: css({
    position: 'fixed',
    left: '50%',
    width: em(asideWidth),
    marginTop: em(headerHeight + theme.gutters.lg),
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

  facet: css({
    // flex: 1,
    // textAlign: 'right',
    color: theme.colors.textMuted,
    fontSize: em(theme.fontSizes.xs),
    marginLeft: em(theme.gutters.sm),
  }),
}

export default withRouter(App)
