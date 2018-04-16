import { hydrate, injectGlobal } from 'emotion'
import * as React from 'react'
import theme, { em, rootFontSize } from '../theme'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'

injectGlobal({
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },
  html: {
    height: '100%',
    fontSize: rootFontSize,
  },
  body: {
    height: '100%',
    fontFamily: theme.fonts.sansSerif,
    fontWeight: 'normal',
    letterSpacing: em(0.3),
    margin: 0,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  },
  '#__next': {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
})

if (typeof window !== 'undefined') {
  const serverData = (window as any).__NEXT_DATA__
  hydrate(serverData.ids)
}

const App: React.SFC<{}> = ({ children }) => (
  <React.Fragment>
    <Header />
    <Container>{children}</Container>
    <Footer />
  </React.Fragment>
)

export default App
