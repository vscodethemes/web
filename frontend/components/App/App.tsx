import { hydrate } from 'emotion'
import * as React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import styles from './App.styles'

if (typeof window !== 'undefined') {
  const serverData = (window as any).__NEXT_DATA__
  hydrate(serverData.ids)
}

const App: React.SFC = ({ children }) => (
  <>
    <Header />
    <div className={styles.container}>{children}</div>
    <Footer />
  </>
)

export default App
