import { hydrate } from 'emotion'
import * as React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import styles from './App.styles'

if (typeof window !== 'undefined') {
  const serverData = (window as any).__NEXT_DATA__
  hydrate(serverData.ids)
}

interface AppProps {
  hideCategories?: boolean
}

const App: React.SFC<AppProps> = ({ children, hideCategories }) => (
  <React.Fragment>
    <Header hideCategories={hideCategories} />
    <div className={styles.container}>{children}</div>
    <Footer />
  </React.Fragment>
)

export default App
