import { LanguageOptions, SortByOptions, Theme } from '@vscodethemes/types'
import { Context } from 'next'
import Head from 'next/head'
import * as React from 'react'
import * as algolia from '../../clients/algolia'
import { App, ThemeSlider } from '../../components'
import * as userAgent from '../../utils/userAgent'
import { classes } from './HomePage.styles'

enum ThemeCategories {
  dark = 'dark',
  light = 'light',
  trending = 'trending',
}

interface CategoryResults {
  themes: Theme[]
  language: LanguageOptions
}

interface Categories {
  [ThemeCategories.dark]: CategoryResults
  [ThemeCategories.light]: CategoryResults
  [ThemeCategories.trending]: CategoryResults
}

interface HomePageProps {
  categories: Categories
  isDesktop: boolean
}

interface HomePageState {
  categories: Categories
}

export default class HomePage extends React.Component<
  HomePageProps,
  HomePageState
> {
  static perPage = 30

  static getCategoryThemes = {
    [ThemeCategories.trending]: HomePage.getTrendingThemes,
    [ThemeCategories.dark]: HomePage.getDarkThemes,
    [ThemeCategories.light]: HomePage.getLightThemes,
  }

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
    const language = LanguageOptions.javascript
    const isDesktop = userAgent.isDesktop(ctx.req)

    const [trendingThemes, darkThemes, lightThemes] = await Promise.all([
      HomePage.getTrendingThemes(language),
      HomePage.getDarkThemes(language),
      HomePage.getLightThemes(language),
    ])

    return {
      categories: {
        [ThemeCategories.trending]: {
          themes: trendingThemes.hits,
          language,
        },
        [ThemeCategories.dark]: {
          themes: darkThemes.hits,
          language,
        },
        [ThemeCategories.light]: {
          themes: lightThemes.hits,
          language,
        },
      },
      isDesktop,
    }
  }

  state = {
    categories: {
      trending: this.props.categories[ThemeCategories.trending],
      dark: this.props.categories[ThemeCategories.dark],
      light: this.props.categories[ThemeCategories.light],
    },
  }

  handleLanguage = async (language: LanguageOptions) => {
    const [trendingThemes, darkThemes, lightThemes] = await Promise.all([
      HomePage.getTrendingThemes(language),
      HomePage.getDarkThemes(language),
      HomePage.getLightThemes(language),
    ])

    this.setState({
      categories: {
        [ThemeCategories.trending]: {
          themes: trendingThemes.hits,
          language,
        },
        [ThemeCategories.dark]: {
          themes: darkThemes.hits,
          language,
        },
        [ThemeCategories.light]: {
          themes: lightThemes.hits,
          language,
        },
      },
    })
  }

  render() {
    const { isDesktop } = this.props
    const { categories } = this.state

    return (
      <App
        isDesktop={isDesktop}
        onLogoClick={() => {
          // TODO
          console.log('implement this') // tslint:disable-line
        }}
      >
        <Head>
          <title>
            VSCodeThemes | Preview themes from the Visual Studio Marketplace
          </title>
        </Head>

        <div className={classes.row}>
          <ThemeSlider
            title="What's Trending"
            language={categories.trending.language}
            themes={categories.trending.themes}
            onLanguage={this.handleLanguage}
          />
          {/* <div className={classes.rowFooter}>More Trending Themes</div> */}
        </div>
        <div className={classes.row}>
          <ThemeSlider
            title="Dark Themes"
            language={categories.dark.language}
            themes={categories.dark.themes}
            onLanguage={this.handleLanguage}
          />
          {/* <div className={classes.rowFooter}>More Dark Themes</div> */}
        </div>
        <div className={classes.row}>
          <ThemeSlider
            title="Light Themes"
            language={categories.light.language}
            themes={categories.light.themes}
            onLanguage={this.handleLanguage}
          />
          {/* <div className={classes.rowFooter}>More Light Themes</div> */}
        </div>
      </App>
    )
  }
}
