import * as React from 'react'
import { LanguageOptions, Theme } from '../../../types/static'
import { isPlaceholder } from '../../utils/generatePlaceholderThemes'
import ActivityBar from './ActivityBar'
import Code from './Code'
import Editor from './Editor'
import StatusBar from './StatusBar'
import Tab from './Tab'
import TabBar from './TabBar'
import TabContent from './TabContent'
import TopBar from './TopBar'

interface ThemePreviewProps extends Theme {
  language: LanguageOptions
  onLanguage: (language: LanguageOptions) => void
}

const ThemePreview: React.SFC<ThemePreviewProps> = ({
  name,
  type,
  extensionId,
  extensionName,
  publisherName,
  trendingMonthly,
  repositoryOwner,
  repository,
  colors,
  language,
  onLanguage,
  ...rest,
}) => {
  return (
    <Editor colors={colors}>
      <TopBar name={name} type={type} />
      <ActivityBar colors={colors} />
      <TabBar colors={colors}>
        <Tab
          colors={colors}
          active={language === 'javascript'}
          onClick={() => onLanguage('javascript')}
        >
          main.js
        </Tab>
        <Tab
          colors={colors}
          active={language === 'css'}
          onClick={() => onLanguage('css')}
        >
          styles.css
        </Tab>
        <Tab
          colors={colors}
          active={language === 'html'}
          onClick={() => onLanguage('html')}
        >
          index.html
        </Tab>
      </TabBar>
      <TabContent>
        {!isPlaceholder(rest) && <Code colors={colors} language={language} />}
      </TabContent>
      <StatusBar
        colors={colors}
        repository={repository}
        repositoryOwner={repositoryOwner}
        extensionName={extensionName}
        publisherName={publisherName}
      />
    </Editor>
  )
}

export default ThemePreview
