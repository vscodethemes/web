import { SearchParams } from '@vscodethemes/types'
import Link from 'next/link'
import * as React from 'react'
import getSearchLinkProps from './getSearchLinkProps'

interface SearchLink {
  params: SearchParams
  children: any
}

const SearchLink: React.SFC<SearchLink> = ({ params, children }) => (
  <Link {...getSearchLinkProps(params)} prefetch={true}>
    {children}
  </Link>
)

export default SearchLink
