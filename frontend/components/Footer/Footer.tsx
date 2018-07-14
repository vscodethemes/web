import * as React from 'react'
import { Icon, Icons } from '../'
import AlgoliaLogo from './AlgoliaLogo'
import styles from './Footer.styles'

const githubLink = 'https://github.com/jschr/vscodethemes'
const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  'Preview themes from the VSCode marketplace',
)}&via=_jschr&url=${encodeURIComponent(
  'https://vscodethemes.com',
)}&hashtags=vscode`

const Footer: React.SFC<{}> = () => (
  <div className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.links}>
        <a className={styles.link} href={githubLink}>
          <Icon className={styles.icon} icon={Icons.github} />View on Github
        </a>
        <a className={styles.link} href={twitterLink} target="_blank">
          <Icon className={styles.icon} icon={Icons.twitter} /> Share on Twitter
        </a>
      </div>
      <AlgoliaLogo />
    </div>
  </div>
)

export default Footer
