import { SearchParams } from '@vscodethemes/types'
import * as algoliasearch from 'algoliasearch'
import { Context } from 'next'
import getConfig from 'next/config'

interface FacetHit {
  value: string
  count: number
}

const { publicRuntimeConfig } = getConfig()
const { algoliaAppId, algoliaSearchKey, algoliaIndex } = publicRuntimeConfig
const client = algoliasearch(algoliaAppId, algoliaSearchKey)

interface SearchOptions extends SearchParams {
  distinct?: number
}

interface Indicies {
  installs: algoliasearch.AlgoliaIndex
  trending: algoliasearch.AlgoliaIndex
  new: algoliasearch.AlgoliaIndex
}

export default class AlgoliaClient {
  private client: algoliasearch.AlgoliaClient
  private indicies: Indicies

  constructor(ctx: Context) {
    this.client = algoliasearch(algoliaAppId, algoliaSearchKey)
    // Set X-Forwarded-For for analytics when performing serverside search.
    if (ctx && ctx.req) {
      const headers = ctx.req.headers['X-Forwarded-For']
      this.client.setExtraHeader(
        'X-Forwarded-For',
        Array.isArray(headers) ? headers.join(',') : headers,
      )
    }

    this.indicies = {
      installs: client.initIndex(`${algoliaIndex}`),
      trending: client.initIndex(`${algoliaIndex}_trending`),
      new: client.initIndex(`${algoliaIndex}_new`),
    }
  }

  async search(opts: SearchOptions) {
    const themeTypes: string[] = []
    if (opts.dark) themeTypes.push('themeType:dark')
    if (opts.light) themeTypes.push('themeType:light')

    let filters = ''
    if (themeTypes.length > 0) {
      filters += `(${themeTypes.join(' OR ')})`
    }
    if (opts.publisherName) {
      filters += ` AND publisherName:${opts.publisherName}`
    }
    if (opts.extensionName) {
      filters += ` AND extensionName:${opts.extensionName}`
    }
    if (opts.lang) {
      filters += ` AND language:${opts.lang}`
    }

    try {
      const results = await this.indicies[opts.sortBy].search({
        query: opts.search,
        filters,
        page: opts.page,
        hitsPerPage: opts.perPage,
        facets: 'themeType',
        distinct: opts.distinct || 0,
      })
      return results
    } catch (err) {
      throw new Error(`Error searching: ${err.message}.`)
    }
  }

  async searchFacets(params: SearchParams) {
    try {
      const { facetHits } = await this.indicies[
        params.sortBy
      ].searchForFacetValues({
        query: params.search,
        filters: `language:${params.lang}`,
        facetName: 'themeType',
        facetQuery: '*',
      })

      const dark = facetHits.find((f: FacetHit) => f.value === 'dark') || {
        count: 0,
      }
      const light = facetHits.find((f: FacetHit) => f.value === 'light') || {
        count: 0,
      }
      return { totalDark: dark.count, totalLight: light.count }
    } catch (err) {
      throw new Error(`Error searching facets: ${err.message}.`)
    }
  }
}
