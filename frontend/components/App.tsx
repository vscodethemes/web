import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import theme, { Theme } from '../theme'
import Container from './Container'
import Form from './Form'
import Input from './Input'
import Tab from './Tab'
import Tabs from './Tabs'

interface AppState {
  search: string
}

class App extends React.Component<RouteComponentProps<{}>, AppState> {
  public state = {
    search: '',
  }

  // public componentWillMount() {
  //   console.log(this.props.location.search)
  //   this.setState({ search: this.props.location.search.search })
  // }

  public render(): React.ReactNode {
    const { search } = this.state

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Form>
            <Tabs>
              <Tab to={{ pathname: '/', search }} exact={true}>
                Popular
              </Tab>
              <Tab to={{ pathname: '/trending/', search }}>Trending</Tab>
              <Tab to={{ pathname: '/new/', search }}>New</Tab>
            </Tabs>
            <Input
              type="search"
              icon="search"
              placeholder="Search VSCode Themes"
              value={search}
              onChange={this.handleSearchChange}
            />
          </Form>
        </Container>
      </ThemeProvider>
    )
  }

  private handleSearchChange = (search: string) => {
    this.setState({ search })
  }
}

export default withRouter(App)
