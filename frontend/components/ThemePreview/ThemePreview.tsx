import { LanguageOptions, Theme } from '@vscodethemes/types'
import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../../theme'
import ActivityBar from './ActivityBar'
import Code from './Code'
import Editor from './Editor'
import StatusBar from './StatusBar'
import Tab from './Tab'
import TabBar from './TabBar'
import TabContent from './TabContent'
import TopBar from './TopBar'

interface ThemePreviewProps {
  theme: Theme
  language: LanguageOptions
  onLanguage: (language: LanguageOptions) => void
}

const classes = {
  container: css({
    width: '100%',
    boxShadow: theme.shadows.md,
    borderRadius: em(theme.borderRadius.md),
  }),
}

const ThemePreview: React.SFC<ThemePreviewProps> = ({
  theme: themeProps,
  language,
  onLanguage,
}) => (
  <div className={classes.container}>
    <TopBar name={themeProps.themeName} />
    <Editor colors={themeProps.colors}>
      <ActivityBar colors={themeProps.colors} />
      <TabBar colors={themeProps.colors}>
        <Tab
          colors={themeProps.colors}
          active={language === LanguageOptions.javascript}
          onClick={() => onLanguage(LanguageOptions.javascript)}
        >
          {LanguageOptions.javascript}
        </Tab>
        <Tab
          colors={themeProps.colors}
          active={language === LanguageOptions.css}
          onClick={() => onLanguage(LanguageOptions.css)}
        >
          {LanguageOptions.css}
        </Tab>
        <Tab
          colors={themeProps.colors}
          active={language === LanguageOptions.html}
          onClick={() => onLanguage(LanguageOptions.html)}
        >
          {LanguageOptions.html}
        </Tab>
      </TabBar>
      <TabContent>
        <Code
          tokens={themeProps.tokens}
          editorForeground={themeProps.colors.editorForeground}
        />
      </TabContent>
    </Editor>
    <StatusBar
      colors={themeProps.colors}
      repository={themeProps.repository}
      repositoryOwner={themeProps.repositoryOwner}
    />
  </div>
)

export default ThemePreview
