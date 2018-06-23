import { LanguageOptions, Theme } from '@vscodethemes/types'
import * as React from 'react'
import { ThemePreview } from '../../components'
import styles from './ThemeGrid.styles'

interface ThemeGridProps {
  themes: Theme[]
  language: LanguageOptions
  onLanguage: (language: LanguageOptions) => any
}

const ThemeGrid: React.SFC<ThemeGridProps> = ({
  themes,
  language,
  onLanguage,
}) => (
  <div className={styles.grid}>
    {themes.map(t => (
      <div key={t.themeId} className={styles.item}>
        <ThemePreview theme={t} language={language} onLanguage={onLanguage} />
      </div>
    ))}
  </div>
)

export default ThemeGrid
