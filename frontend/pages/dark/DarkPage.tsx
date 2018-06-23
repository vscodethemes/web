import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import { Context } from 'next'
import Head from 'next/head'
import * as React from 'react'
import * as algolia from '../../clients/algolia'
import { App, Heading, Pagination, ThemeGrid } from '../../components'
import * as userAgent from '../../utils/userAgent'
import { DarkLink } from './'
import styles from './DarkPage.styles'

interface DarkPageProps {
  themes: Theme[]
  page: number
  totalPages: number
  language: LanguageOptions
  isDesktop: boolean
}

export default class DarkPage extends React.Component<DarkPageProps, {}> {
  static perPage = 24

  static async getInitialProps(ctx: Context): Promise<DarkPageProps> {
    const language = LanguageOptions.javascript
    const isDesktop = userAgent.isDesktop(ctx.req)
    const page = parseInt(ctx.query.page, 10) || 1

    const darkThemes = await algolia.search({
      dark: true,
      light: false,
      sortBy: SortByOptions.installs,
      lang: language,
      perPage: DarkPage.perPage,
      page: page - 1,
      distinct: 1,
    })

    return {
      themes: darkThemes.hits,
      totalPages: darkThemes.nbPages,
      page,
      language,
      isDesktop,
    }
  }

  handleLanguage = async (language: LanguageOptions) => {
    console.log('implement this') // tslint:disable-line
  }

  render() {
    const { themes, language, page, totalPages, isDesktop } = this.props

    return (
      <App isDesktop={isDesktop}>
        <Head>
          <title>Dark themes</title>
        </Head>
        <div className={styles.wrapper}>
          <Heading text="Dark themes" />
          <ThemeGrid
            themes={themes}
            language={language}
            onLanguage={this.handleLanguage}
          />
          <Pagination page={page} totalPages={totalPages} Link={DarkLink} />
        </div>
      </App>
    )
  }
}
