import { SearchParams, Theme } from '@vscodethemes/types'
import * as algoliasearch from 'algoliasearch'
import * as next from 'next'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { algoliaAppId, algoliaSearchKey } = publicRuntimeConfig
const client = algoliasearch(algoliaAppId, algoliaSearchKey)

const indicies = {
  installs: client.initIndex('themes_by_installs_desc'),
  trending: client.initIndex('themes_by_trending_desc'),
  new: client.initIndex('themes_by_publishDate_desc'),
}

export async function search(params: SearchParams): Promise<Theme[]> {
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

    return hits
  } catch (err) {
    throw new Error(`Error searching: ${err.message}.`)
  }
}
