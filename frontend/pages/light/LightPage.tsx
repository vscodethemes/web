import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import { Context } from 'next'
import Head from 'next/head'
import * as React from 'react'
import * as algolia from '../../clients/algolia'
import { App, Heading, Pagination, ThemeGrid } from '../../components'
import { LightLink } from './'
import styles from './LightPage.styles'

interface LightPageProps {
  themes: Theme[]
  page: number
  totalPages: number
  language: LanguageOptions
}

export default class LightPage extends React.Component<LightPageProps, {}> {
  static perPage = 24

  static async getInitialProps(ctx: Context): Promise<LightPageProps> {
    const language = LanguageOptions.javascript
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

  handleLanguage = async (language: LanguageOptions) => {
    console.log('implement this') // tslint:disable-line
  }

  render() {
    const { themes, language, page, totalPages } = this.props

    return (
      <App>
        <Head>
          <title>Light themes</title>
        </Head>
        <div className={styles.wrapper}>
          <ThemeGrid
            themes={themes}
            language={language}
            onLanguage={this.handleLanguage}
          />
          <Pagination page={page} totalPages={totalPages} Link={LightLink} />
        </div>
      </App>
    )
  }
}
