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
  pages: {
    [key: string]: Theme[]
  }
  totalPages: number
  totalThemes: number
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
  static perPage = 20

  static getCategoryThemes = {
    [ThemeCategories.trending]: HomePage.getTrendingThemes,
    [ThemeCategories.dark]: HomePage.getDarkThemes,
    [ThemeCategories.light]: HomePage.getLightThemes,
  }

  static async getTrendingThemes(page: number, lang: LanguageOptions) {
    return algolia.search({
      dark: true,
      light: true,
      sortBy: SortByOptions.trending,
      page,
      lang,
      distinct: 1,
      perPage: HomePage.perPage,
    })
  }

  static async getDarkThemes(page: number, lang: LanguageOptions) {
    return algolia.search({
      dark: true,
      sortBy: SortByOptions.installs,
      page,
      lang,
      distinct: 1,
      perPage: HomePage.perPage,
    })
  }

  static async getLightThemes(page: number, lang: LanguageOptions) {
    return algolia.search({
      light: true,
      sortBy: SortByOptions.installs,
      page,
      lang,
      distinct: 1,
      perPage: HomePage.perPage,
    })
  }

  static async getNewThemes(page: number, lang: LanguageOptions) {
    return algolia.search({
      dark: true,
      light: true,
      sortBy: SortByOptions.new,
      page,
      lang,
      distinct: 1,
      perPage: HomePage.perPage,
    })
  }

  static async getInitialProps(ctx: Context): Promise<HomePageProps> {
    const page = 0
    const language = LanguageOptions.javascript
    const isDesktop = userAgent.isDesktop(ctx.req)

    const [trendingThemes, darkThemes, lightThemes] = await Promise.all([
      HomePage.getTrendingThemes(page, language),
      HomePage.getDarkThemes(page, language),
      HomePage.getLightThemes(page, language),
    ])

    return {
      categories: {
        [ThemeCategories.trending]: {
          pages: {
            [page]: trendingThemes.hits,
          },
          totalPages: trendingThemes.nbPages,
          totalThemes: trendingThemes.nbHits,
          language,
        },
        [ThemeCategories.dark]: {
          pages: {
            [page]: darkThemes.hits,
          },
          totalPages: darkThemes.nbPages,
          totalThemes: darkThemes.nbHits,
          language,
        },
        [ThemeCategories.light]: {
          pages: {
            [page]: lightThemes.hits,
          },
          totalPages: lightThemes.nbPages,
          totalThemes: lightThemes.nbHits,
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

  handleSlide = (categoryName: ThemeCategories) => async (
    index: number,
    numOfVisibleItems: number,
  ) => {
    const { categories } = this.state
    const category = categories[categoryName]
    const currentPage = Math.ceil(index / HomePage.perPage) - 1
    const pageIndex = index % HomePage.perPage
    const hasMorePages = currentPage < category.totalPages
    const nextPage = currentPage + 1
    const isNextPageEmpty = !category.pages[nextPage]
    const isApproachingNextPage =
      pageIndex + numOfVisibleItems * 2 + 1 > HomePage.perPage
    const shouldFetchNextPage =
      isApproachingNextPage && isNextPageEmpty && hasMorePages

    if (shouldFetchNextPage) {
      const results = await HomePage.getCategoryThemes[categoryName](
        nextPage,
        category.language,
      )

      this.setCategory(categoryName, {
        pages: {
          ...category.pages,
          [nextPage]: results.hits,
        },
        totalPages: results.nbPages,
        totalThemes: results.nbHits,
        language: category.language,
      })
    }
  }

  handleLanguage = async (language: LanguageOptions) => {
    // const { categories } = this.state
    // const [trendingThemes, darkThemes, lightThemes] = await Promise.all([
    //   HomePage.getTrendingThemes(categories.trending.page, language),
    //   HomePage.getDarkThemes(categories.dark.page, language),
    //   HomePage.getLightThemes(categories.light.page, language),
    // ])
    // this.setCategory(ThemeCategories.trending, {
    //   themes: trendingThemes.hits,
    //   total: trendingThemes.nbHits,
    //   language,
    // })
    // this.setCategory(ThemeCategories.dark, {
    //   themes: darkThemes.hits,
    //   total: darkThemes.nbHits,
    //   language,
    // })
    // this.setCategory(ThemeCategories.light, {
    //   themes: lightThemes.hits,
    //   total: lightThemes.nbHits,
    //   language,
    // })
  }

  setCategory(categoryName: ThemeCategories, category: CategoryResults) {
    this.setState({
      categories: {
        ...this.state.categories,
        [categoryName]: category,
      },
    })
  }

  getThemesForCategory(category: CategoryResults) {
    // Themes is a sparse array that represents all themes in a category.
    // Only themes from fetched pages are added to the array.
    const themes: Array<Theme | undefined> = new Array(category.totalThemes)

    Object.keys(category.pages).forEach(page => {
      const pageThemes = category.pages[page] || []
      const pageThemesCount = pageThemes.length
      for (let index = 0; index < pageThemesCount; index += 1) {
        const pageStartIndex = parseInt(page, 10) * HomePage.perPage
        themes[pageStartIndex + index] = pageThemes[index]
      }
    })

    return themes
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
            themes={this.getThemesForCategory(categories.trending)}
            onSlide={this.handleSlide(ThemeCategories.trending)}
            onLanguage={this.handleLanguage}
          />
          {/* <div className={classes.rowFooter}>More Trending Themes</div> */}
        </div>
        <div className={classes.row}>
          <ThemeSlider
            title="Dark Themes"
            language={categories.dark.language}
            themes={this.getThemesForCategory(categories.dark)}
            onSlide={this.handleSlide(ThemeCategories.dark)}
            onLanguage={this.handleLanguage}
          />
          {/* <div className={classes.rowFooter}>More Dark Themes</div> */}
        </div>
        <div className={classes.row}>
          <ThemeSlider
            title="Light Themes"
            language={categories.light.language}
            themes={this.getThemesForCategory(categories.light)}
            onSlide={this.handleSlide(ThemeCategories.light)}
            onLanguage={this.handleLanguage}
          />
          {/* <div className={classes.rowFooter}>More Light Themes</div> */}
        </div>
      </App>
    )
  }
}
