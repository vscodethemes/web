import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import theme, { Theme } from '../theme'
import Container from './Container'
import Form from './Form'
import Tab from './Tab'
import Tabs from './Tabs'

class App extends React.Component<RouteComponentProps<{}>, {}> {
  public render(): React.ReactNode {
    const { search } = this.props.location
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Form>
            <Tabs>
              <Tab to={{ pathname: '/', search }} exact={true}>
                Popular
              </Tab>
              <Tab to={{ pathname: '/trending', search }}>Trending</Tab>
              <Tab to={{ pathname: '/new', search }}>New</Tab>
            </Tabs>
          </Form>
        </Container>
      </ThemeProvider>
    )
  }
}

export default withRouter(App)
