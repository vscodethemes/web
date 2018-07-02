import { cx } from 'emotion'
import * as React from 'react'
import styles from './Paragraph.styles'

interface ParagraphProps {
  text?: string
  small?: boolean
}

const Paragraph: React.SFC<ParagraphProps> = ({ text, small, children }) => (
  <p className={cx(styles.paragraph, small && styles.small)}>
    {children || text}
  </p>
)

export default Paragraph
