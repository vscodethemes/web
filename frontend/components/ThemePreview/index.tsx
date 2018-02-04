import { css } from 'emotion'
import * as React from 'react'
import { LanguageOptions, Theme } from '../../../types/static'
import theme, { em } from '../../theme'
import { isPlaceholder } from '../../utils/generatePlaceholderThemes'
import ActivityBar from './ActivityBar'
import Code from './Code'
import Editor from './Editor'
import Spinner from './Spinner'
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
  theme,
  language,
  onLanguage,
}) => {
  return (
    <div className={classes.container}>
      <TopBar name={theme.name} type={theme.type} />
      <Editor colors={theme.colors}>
        <ActivityBar colors={theme.colors} />
        <TabBar colors={theme.colors}>
          <Tab
            colors={theme.colors}
            active={language === 'javascript'}
            onClick={() => onLanguage('javascript')}
          >
            main.js
          </Tab>
          <Tab
            colors={theme.colors}
            active={language === 'css'}
            onClick={() => onLanguage('css')}
          >
            styles.css
          </Tab>
          <Tab
            colors={theme.colors}
            active={language === 'html'}
            onClick={() => onLanguage('html')}
          >
            index.html
          </Tab>
        </TabBar>
        <TabContent>
          {!isPlaceholder(theme) && (
            <Code colors={theme.colors} language={language} />
          )}
        </TabContent>
        {isPlaceholder(theme) && <Spinner />}
      </Editor>
      <StatusBar
        colors={theme.colors}
        repository={theme.repository}
        repositoryOwner={theme.repositoryOwner}
        extensionName={theme.extensionName}
        publisherName={theme.publisherName}
      />
    </div>
  )
}

const classes = {
  container: css({
    position: 'relative',
    marginBottom: em(theme.gutters.lg),
    boxShadow: theme.shadows.md,
  }),
}

export default ThemePreview
