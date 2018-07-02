import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import { Context } from 'next'
import * as React from 'react'
import * as algolia from '../../clients/algolia'
import {
  Button,
  Heading,
  Icon,
  Icons,
  Meta,
  Paragraph,
  ThemePreview,
} from '../../components'
import { getLanguage, setLanguage } from '../../utils/cookies'
import styles from './ExtensionPage.styles'

interface ExtensionPageProps {
  primary: Theme
  themes: Theme[]
  language: LanguageOptions
  refetchInitialProps?: () => any
}

export default class ExtensionPage extends React.Component<
  ExtensionPageProps,
  {}
> {
  static perPage = 24

  static async getInitialProps(ctx: Context): Promise<ExtensionPageProps> {
    const language = getLanguage(ctx)
    const { publisherName, extensionName } = ctx.query
    const page = 1

    // TODO: Validate repositoryOwner and repository

    const extensionThemes = await algolia.search({
      dark: true,
      light: true,
      lang: language,
      publisherName,
      extensionName,
      sortBy: SortByOptions.installs,
      perPage: ExtensionPage.perPage,
      page: page - 1,
    })

    return {
      primary: extensionThemes.hits[0],
      themes: extensionThemes.hits,
      language,
    }
  }

  handleLanguage = (language: LanguageOptions) => {
    setLanguage(language)
    this.props.refetchInitialProps()
  }

  render() {
    const { primary, language } = this.props
    const {
      displayName,
      repositoryOwner,
      repository,
      extensionName,
      publisherName,
    } = primary
    const title = `${displayName} by ${publisherName}`
    // Add a '.' to the end if it doesn't exist.
    const description = /[!\?\.]$/.test(primary.shortDescription)
      ? primary.shortDescription
      : `${primary.shortDescription}.`

    return (
      <div className={styles.wrapper}>
        <Meta title={title} description={description} />
        <div className={styles.preview}>
          <ThemePreview
            theme={primary}
            language={language}
            onLanguage={console.log}
            hideViewExtension={true}
          />
        </div>
        <div className={styles.info}>
          <Heading text={displayName} />
          <span className={styles.owner}>by {publisherName}</span>
          <Paragraph text={description} />
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
                title,
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
  }
}
