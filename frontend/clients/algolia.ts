import { SearchParams } from '@vscodethemes/types'
import * as algoliasearch from 'algoliasearch'
import getConfig from 'next/config'

interface FacetHit {
  value: string
  count: number
}

const { publicRuntimeConfig } = getConfig()
const { algoliaAppId, algoliaSearchKey, algoliaIndex } = publicRuntimeConfig
const client = algoliasearch(algoliaAppId, algoliaSearchKey)

const indicies = {
  installs: client.initIndex(`${algoliaIndex}`),
  trending: client.initIndex(`${algoliaIndex}`),
  new: client.initIndex(`${algoliaIndex}`),
}

export async function search(params: SearchParams) {
  const themeTypes: string[] = []
  if (params.dark) themeTypes.push('themeType:dark')
  if (params.light) themeTypes.push('themeType:light')

  let filters = ''
  if (themeTypes.length > 0) filters += `(${themeTypes.join(' OR ')}) AND `
  filters += `language:${params.lang}`

  try {
    const { hits, nbPages } = await indicies[params.sortBy].search({
      query: params.search,
      filters,
      page: params.page - 1,
      hitsPerPage: params.perPage,
      facets: 'themeType',
    })
    return { results: hits, totalPages: nbPages }
  } catch (err) {
    throw new Error(`Error searching: ${err.message}.`)
  }
}

export async function searchFacets(params: SearchParams) {
  try {
    const { facetHits } = await indicies[params.sortBy].searchForFacetValues({
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
