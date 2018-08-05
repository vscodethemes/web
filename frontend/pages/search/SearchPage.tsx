import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import { Context } from 'next'
import * as React from 'react'
import AlgoliaClient from '../../clients/algolia'
import { Heading, Meta, Pagination, ThemeGrid } from '../../components'
import { getLanguage, setLanguage } from '../../utils/cookies'
import { SearchLink } from './'
import styles from './SearchPage.styles'

interface SearchPageProps {
  themes: Theme[]
  page: number
  search: string
  totalPages: number
  language: LanguageOptions
  refetchInitialProps?: () => any
}

export default class SearchPage extends React.Component<SearchPageProps, {}> {
  static perPage = 24

  static async getInitialProps(ctx: Context): Promise<SearchPageProps> {
    const algolia = new AlgoliaClient(ctx)
    const language = getLanguage(ctx)
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

  handleLanguage = (language: LanguageOptions) => {
    setLanguage(language)
    this.props.refetchInitialProps()
  }

  render() {
    const { themes, language, page, totalPages, search } = this.props

    return (
      <div className={styles.wrapper}>
        <Meta title={`Themes matching '${search}'`} />
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
    )
  }
}
