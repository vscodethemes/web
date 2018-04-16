import { SearchParams } from '@vscodethemes/types'
import * as algoliasearch from 'algoliasearch'
import getConfig from 'next/config'

interface FacetHit {
  value: string
  count: number
}

const { publicRuntimeConfig } = getConfig()
const { algoliaAppId, algoliaSearchKey } = publicRuntimeConfig
const client = algoliasearch(algoliaAppId, algoliaSearchKey)

const indicies = {
  installs: client.initIndex('themes_by_installs_desc'),
  trending: client.initIndex('themes_by_trending_desc'),
  new: client.initIndex('themes_by_publishDate_desc'),
}

export async function search(params: SearchParams) {
  const types: string[] = []

  if (params.dark) {
    types.push('type:dark')
  }
  if (params.light) {
    types.push('type:light')
  }

  try {
    const { hits, nbPages } = await indicies[params.sortBy].search({
      query: params.search,
      filters: types.join(' OR '),
      page: params.page - 1,
      hitsPerPage: params.perPage,
      facets: 'type',
    })

    return { results: hits, totalPages: nbPages }
  } catch (err) {
    throw new Error(`Error searching: ${err.message}.`)
  }
}

export async function searchFacets(props: SearchParams) {
  try {
    const { facetHits } = await indicies[props.sortBy].searchForFacetValues({
      query: props.search,
      facetName: 'type',
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
