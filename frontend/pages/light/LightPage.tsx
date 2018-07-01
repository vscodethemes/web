import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import { Context } from 'next'
import * as React from 'react'
import * as algolia from '../../clients/algolia'
import { Meta, Pagination, ThemeGrid } from '../../components'
import { getLanguage, setLanguage } from '../../utils/cookies'
import { LightLink } from './'
import styles from './LightPage.styles'

interface LightPageProps {
  themes: Theme[]
  page: number
  totalPages: number
  language: LanguageOptions
  refetchInitialProps?: () => any
}

export default class LightPage extends React.Component<LightPageProps, {}> {
  static perPage = 24

  static async getInitialProps(ctx: Context): Promise<LightPageProps> {
    const language = getLanguage(ctx)
    const page = parseInt(ctx.query.page, 10) || 1

    const lightThemes = await algolia.search({
      dark: false,
      light: true,
      sortBy: SortByOptions.installs,
      lang: language,
      perPage: LightPage.perPage,
      page: page - 1,
      distinct: 1,
    })

    return {
      themes: lightThemes.hits,
      totalPages: lightThemes.nbPages,
      page,
      language,
    }
  }

  handleLanguage = (language: LanguageOptions) => {
    setLanguage(language)
    this.props.refetchInitialProps()
  }

  render() {
    const { themes, language, page, totalPages } = this.props

    return (
      <div className={styles.wrapper}>
        <Meta title="Light themes" />
        <ThemeGrid
          themes={themes}
          language={language}
          onLanguage={this.handleLanguage}
        />
        <Pagination page={page} totalPages={totalPages} Link={LightLink} />
      </div>
    )
  }
}
