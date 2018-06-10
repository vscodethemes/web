import { hydrate } from 'emotion'
import * as React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import { UserProvider } from '../UserContext'
import styles from './App.styles'

if (typeof window !== 'undefined') {
  const serverData = (window as any).__NEXT_DATA__
  hydrate(serverData.ids)
}

interface AppProps {
  isDesktop: boolean
  onLogoClick?: () => any
}

const App: React.SFC<AppProps> = ({ children, isDesktop, onLogoClick }) => (
  <UserProvider value={{ isDesktop }}>
    <React.Fragment>
      <Header onLogoClick={onLogoClick} />
      <div className={styles.container}>{children}</div>
      <Footer />
    </React.Fragment>
  </UserProvider>
)

export default App
