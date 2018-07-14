import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import * as React from 'react'
import {
  Button,
  Heading,
  Icon,
  Icons,
  Meta,
  Paragraph,
  ThemeRotator,
} from '../../components'
import styles from './Extension.styles'

interface ExtensionProps {
  displayName: string
  shortDescription: string
  publisherName: string
  extensionName: string
  repositoryOwner: string
  repository: string
  themes: Theme[]
  language: LanguageOptions
  onLanguage: (language: LanguageOptions) => any
}

const ExtensionPage: React.SFC<ExtensionProps> = ({
  displayName,
  shortDescription,
  publisherName,
  extensionName,
  repositoryOwner,
  repository,
  themes,
  language,
}) => (
  <div className={styles.container}>
    <div className={styles.preview}>
      <ThemeRotator
        themes={themes}
        language={language}
        onLanguage={this.handleLanguage}
      />
    </div>
    <div className={styles.info}>
      <Heading text={displayName} />
      <span className={styles.owner}>by {publisherName}</span>
      <Paragraph text={shortDescription} />
      <div className={styles.actions}>
        <span className={styles.install}>
          <Button
            icon={Icons.download}
            label="Install Extension"
            href={`vscode:extension/${publisherName}.${extensionName}`}
          />
        </span>
        <a
          className={styles.link}
          href={`https://github.com/${repositoryOwner}/${repository}`}
        >
          <Icon icon={Icons.github} />
        </a>
        <a
          className={styles.link}
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${displayName} by ${publisherName}`,
          )}&url=${encodeURIComponent(
            `https://vscodethemes.com/e/${publisherName}.${extensionName}`,
          )}&hashtags=vscode`}
        >
          <Icon icon={Icons.twitter} />
        </a>
      </div>
    </div>
  </div>
)

export default ExtensionPage
