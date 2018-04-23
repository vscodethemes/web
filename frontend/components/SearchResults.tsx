import { SearchParams, Theme } from '@vscodethemes/types'
import { css } from 'emotion'
import * as React from 'react'
import theme from '../theme'
import ThemePreview from './ThemePreview'

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
      <div className={classes.empty}>
        <p className={classes.emptyMessage}>
          No themes found for '{params.search}'.
        </p>
        <button className={classes.clear} onClick={onClear}>
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

const classes = {
  empty: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  emptyMessage: css({
    color: theme.colors.textMuted,
    marginTop: 0,
    marginBottom: theme.gutters.sm,
  }),

  clear: css({
    fontSize: theme.fontSizes.md,
    background: 'transparent',
    border: 0,
    color: theme.colors.text,
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.palette[0],
    },
  }),

  footer: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
}

export default SearchResults
