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

const ThemePreview: React.SFC<ThemePreviewProps> = ({
  theme: themeProps,
  language = LanguageOptions.javascript,
  onLanguage,
}) => {
  return (
    <div className={classes.container}>
      <TopBar name={themeProps.themeName} />
      <Editor colors={themeProps.colors}>
        <ActivityBar colors={themeProps.colors} />
        <TabBar colors={themeProps.colors}>
          <Tab
            colors={themeProps.colors}
            active={language === 'javascript'}
            onClick={() => onLanguage(LanguageOptions.javascript)}
          >
            main.js
          </Tab>
          <Tab
            colors={themeProps.colors}
            active={language === 'css'}
            onClick={() => onLanguage(LanguageOptions.css)}
          >
            styles.css
          </Tab>
          <Tab
            colors={themeProps.colors}
            active={language === 'html'}
            onClick={() => onLanguage(LanguageOptions.html)}
          >
            index.html
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
        extensionName={themeProps.extensionName}
        publisherName={themeProps.publisherName}
      />
    </div>
  )
}

const classes = {
  container: css({
    width: '100%',
    boxShadow: theme.shadows.md,
    borderRadius: em(theme.borderRadius.md),
  }),
}

export default ThemePreview
