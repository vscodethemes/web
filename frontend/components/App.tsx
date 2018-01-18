import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'
import theme, { Theme } from '../theme'
import Container from './Container'
import Form from './Form'
import Tab from './Tab'
import Tabs from './Tabs'

export default class App extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Form>
            <Tabs>
              <Tab active={true}>Trending</Tab>
              <Tab>Popular</Tab>
              <Tab>New</Tab>
            </Tabs>
          </Form>
        </Container>
      </ThemeProvider>
    )
  }
}
