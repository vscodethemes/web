import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import { Context } from 'next'
import Head from 'next/head'
import * as React from 'react'
import * as algolia from '../../clients/algolia'
import { App, Heading, Pagination, ThemeGrid } from '../../components'
import { SearchLink } from './'
import styles from './SearchPage.styles'

interface SearchPageProps {
  themes: Theme[]
  page: number
  search: string
  totalPages: number
  language: LanguageOptions
}

export default class SearchPage extends React.Component<SearchPageProps, {}> {
  static perPage = 24

  static async getInitialProps(ctx: Context): Promise<SearchPageProps> {
    const language = LanguageOptions.javascript
    const page = parseInt(ctx.query.page, 10) || 1
    const search = ctx.query.q || ''

    const results = await algolia.search({
      search,
      dark: true,
      light: true,
      sortBy: SortByOptions.installs,
      lang: language,
      perPage: SearchPage.perPage,
      page: page - 1,
      distinct: 1,
    })

    return {
      search,
      themes: results.hits,
      totalPages: results.nbPages,
      page,
      language,
    }
  }

  handleLanguage = async (language: LanguageOptions) => {
    console.log('implement this') // tslint:disable-line
  }

  render() {
    const { themes, language, page, totalPages, search } = this.props

    return (
      <App>
        <Head>
          <title>Trending themes</title>
        </Head>
        <div className={styles.wrapper}>
          <Heading>
            Results for <em>'{search}'</em>
          </Heading>
          <ThemeGrid
            themes={themes}
            language={language}
            onLanguage={this.handleLanguage}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            Link={SearchLink}
            linkProps={{ q: search }}
          />
        </div>
      </App>
    )
  }
}
