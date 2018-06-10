import { SearchParams, Theme } from '@vscodethemes/types'
import * as React from 'react'
import ThemePreview from '../ThemePreview'
import styles from './SearchResults.styles'

interface Props {
  params: SearchParams
  themes: Theme[]
  onLanguage: (language: string) => any
  onClear: () => any
}

const SearchResults: React.SFC<Props> = ({
  params,
  themes,
  onLanguage,
  onClear,
}) => {
  if (themes.length === 0 && params.search) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyMessage}>
          No themes found for '{params.search}'.
        </p>
        <button className={styles.clear} onClick={onClear}>
          Clear Search
        </button>
      </div>
    )
  }

  return (
    <React.Fragment>
      {themes.map(t => (
        <ThemePreview
          key={t.objectID}
          theme={t}
          language={params.lang}
          onLanguage={onLanguage}
        />
      ))}
    </React.Fragment>
  )
}

export default SearchResults
