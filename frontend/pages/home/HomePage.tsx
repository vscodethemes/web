import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import { Context } from 'next'
import * as React from 'react'
import * as algolia from '../../clients/algolia'
import { Meta, ThemeSlider } from '../../components'
import { getLanguage, setLanguage } from '../../utils/cookies'
import { DarkLink } from '../dark'
import { LightLink } from '../light'
import { TrendingLink } from '../trending'
import styles from './HomePage.styles'

enum Category {
  dark = 'dark',
  light = 'light',
  trending = 'trending',
}

interface CategoryResults {
  themes: Theme[]
  language: LanguageOptions
}

interface Categories {
  [Category.dark]: CategoryResults
  [Category.light]: CategoryResults
  [Category.trending]: CategoryResults
}

interface HomePageProps {
  categories: Categories
  refetchInitialProps?: () => any
}

export default class HomePage extends React.Component<HomePageProps, {}> {
  static perPage = 30

  static async getTrendingThemes(lang: LanguageOptions) {
    return algolia.search({
      dark: true,
      light: true,
      sortBy: SortByOptions.trending,
      lang,
      page: 0,
      perPage: HomePage.perPage,
      distinct: 1,
    })
  }

  static async getDarkThemes(lang: LanguageOptions) {
    return algolia.search({
      dark: true,
      sortBy: SortByOptions.installs,
      lang,
      page: 0,
      perPage: HomePage.perPage,
      distinct: 1,
    })
  }

  static async getLightThemes(lang: LanguageOptions) {
    return algolia.search({
      light: true,
      sortBy: SortByOptions.installs,
      lang,
      page: 0,
      perPage: HomePage.perPage,
      distinct: 1,
    })
  }

  static async getNewThemes(lang: LanguageOptions) {
    return algolia.search({
      dark: true,
      light: true,
      sortBy: SortByOptions.new,
      lang,
      page: 0,
      perPage: HomePage.perPage,
      distinct: 1,
    })
  }

  static async getInitialProps(ctx: Context): Promise<HomePageProps> {
    const language = getLanguage(ctx)

    const [trendingThemes, darkThemes, lightThemes] = await Promise.all([
      HomePage.getTrendingThemes(language),
      HomePage.getDarkThemes(language),
      HomePage.getLightThemes(language),
    ])

    return {
      categories: {
        [Category.trending]: {
          themes: trendingThemes.hits,
          language,
        },
        [Category.dark]: {
          themes: darkThemes.hits,
          language,
        },
        [Category.light]: {
          themes: lightThemes.hits,
          language,
        },
      },
    }
  }

  handleLanguage = async (language: LanguageOptions) => {
    setLanguage(language)
    this.props.refetchInitialProps()
  }

  render() {
    const { categories } = this.props

    return (
      <div className={styles.wrapper}>
        <Meta />
        <TrendingLink page={2}>
          {({ href, onClick }) => (
            <ThemeSlider
              title="Trending themes"
              description="trending themes"
              language={categories.trending.language}
              themes={categories.trending.themes}
              onLanguage={this.handleLanguage}
              moreProps={{ href, onClick }}
            />
          )}
        </TrendingLink>
        <DarkLink page={2}>
          {({ href, onClick }) => (
            <ThemeSlider
              title="Dark themes"
              description="dark themes"
              language={categories.dark.language}
              themes={categories.dark.themes}
              onLanguage={this.handleLanguage}
              moreProps={{ href, onClick }}
            />
          )}
        </DarkLink>
        <LightLink page={2}>
          {({ href, onClick }) => (
            <ThemeSlider
              title="Light themes"
              description="light themes"
              language={categories.light.language}
              themes={categories.light.themes}
              onLanguage={this.handleLanguage}
              moreProps={{ href, onClick }}
            />
          )}
        </LightLink>
      </div>
    )
  }
}
