import * as React from 'react'
import { Icon, Icons } from '../'
import AlgoliaLogo from './AlgoliaLogo'
import styles from './Footer.styles'

const Footer: React.SFC<{}> = () => (
  <div className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.links}>
        <a
          className={styles.link}
          href="'https://github.com/jschr/vscodethemes'"
        >
          <Icon className={styles.icon} icon={Icons.github} />View on Github
        </a>
      </div>
      <AlgoliaLogo />
    </div>
  </div>
)

export default Footer
