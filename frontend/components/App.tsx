import * as qs from 'query-string'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Checkbox from './Checkbox'
import Container from './Container'
import Form from './Form'
import Input from './Input'
import Tab from './Tab'
import Tabs from './Tabs'

interface QueryParams {
  search?: string
  dark?: boolean
  light?: boolean
  highContrast?: boolean
}

class App extends React.Component<RouteComponentProps<{}>, {}> {
  public componentDidMount() {
    if (this.props.location.search) {
      this.forceUpdate()
    }
  }

  public render(): React.ReactNode {
    const { location } = this.props
    const params = this.parseQueryParams()

    return (
      <Container>
        <Form>
          <Tabs>
            <Tab to={{ pathname: '/', search: location.search }} exact={true}>
              Popular
            </Tab>
            <Tab to={{ pathname: '/trending/', search: location.search }}>
              Trending
            </Tab>
            <Tab to={{ pathname: '/new/', search: location.search }}>New</Tab>
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
        </Form>
      </Container>
    )
  }

  private parseQueryParams = (): QueryParams => {
    const params = qs.parse(this.props.location.search)

    return {
      search: params.search,
      light: 'light' in params,
      dark: 'dark' in params,
      highContrast: 'highContrast' in params,
    }
  }

  private setQueryParams = (params: any) => {
    const { location, history } = this.props
    Object.keys(params).forEach(key => {
      if (!params[key]) {
        delete params[key]
      }
      if (params[key] === true) {
        params[key] = 1
      }
    })
    history.push(`${location.pathname}?${qs.stringify(params)}`)
  }
}

export default withRouter(App)
