import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import { Context } from 'next'
import Head from 'next/head'
import * as React from 'react'
import * as algolia from '../../clients/algolia'
import { App, Heading, ThemeGrid } from '../../components'
import * as userAgent from '../../utils/userAgent'
import styles from './TrendingPage.styles'

interface TrendingPageProps {
  themes: Theme[]
  page: number
  language: LanguageOptions
  isDesktop: boolean
}

export default class TrendingPage extends React.Component<
  TrendingPageProps,
  {}
> {
  static perPage = 24

  static async getInitialProps(ctx: Context): Promise<TrendingPageProps> {
    const language = LanguageOptions.javascript
    const isDesktop = userAgent.isDesktop(ctx.req)
    const page = parseInt(ctx.query.page, 10) || 1

    const trendingThemes = await algolia.search({
      dark: true,
      light: true,
      sortBy: SortByOptions.trending,
      lang: language,
      perPage: TrendingPage.perPage,
      page: page - 1,
      distinct: 1,
    })

    return {
      themes: trendingThemes.hits,
      page,
      language,
      isDesktop,
    }
  }

  handleLanguage = async (language: LanguageOptions) => {
    console.log('implement this') // tslint:disable-line
  }

  render() {
    const { themes, language, isDesktop } = this.props

    return (
      <App isDesktop={isDesktop}>
        <Head>
          <title>Trending themes</title>
        </Head>
        <div className={styles.wrapper}>
          <Heading text="Trending themes" />
          <ThemeGrid
            themes={themes}
            language={language}
            onLanguage={this.handleLanguage}
          />
        </div>
      </App>
    )
  }
}
