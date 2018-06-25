import * as React from 'react'
import styles from './Heading.styles'

interface HeadingProps {
  text?: string
}

const Heading: React.SFC<HeadingProps> = ({ text, children }) => (
  <h1 className={styles.heading}>
    <span className={styles.text}>{children || text}</span>
  </h1>
)

export default Heading
