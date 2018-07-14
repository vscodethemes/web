import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import { Context } from 'next'
import * as React from 'react'
import * as algolia from '../../clients/algolia'
import {
  Button,
  Extension,
  Heading,
  Icon,
  Icons,
  Meta,
  Paragraph,
  ThemeRotator,
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
    const { primary, themes, language } = this.props
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
        <Extension
          displayName={primary.displayName}
          shortDescription={description}
          publisherName={primary.publisherName}
          extensionName={primary.extensionName}
          repositoryOwner={primary.repositoryOwner}
          repository={primary.repository}
          themes={themes}
          language={language}
          onLanguage={this.handleLanguage}
        />
      </div>
    )
  }
}
