import * as React from 'react'
import styles from './Tabs.styles'

const Tabs: React.SFC<{}> = ({ children }) => (
  <div className={styles.tabs}>{children}</div>
)

export default Tabs
