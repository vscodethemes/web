import * as React from 'react'
import { LanguageOptions, Theme } from '../../../types/static'
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
  tokens,
  language,
  onLanguage,
}) => {
  const tabProps = {
    activeBackground: colors.tabActiveBackground,
    activeForeground: colors.tabActiveForeground,
    activeBorder: colors.tabActiveBorder,
    inactiveBackground: colors.tabInactiveBackground,
    inactiveForeground: colors.tabInactiveForeground,
    border: colors.tabBorder,
  }

  const isPlaceholder = !extensionId

  return (
    <Editor background={colors.editorBackground}>
      <TopBar name={name} type={type} />
      <ActivityBar
        background={colors.activityBarBackground}
        foreground={colors.activityBarForeground}
      />
      <TabBar
        background={colors.editorGroupHeaderTabsBackground}
        border={colors.editorGroupHeaderTabsBorder}
      >
        <Tab
          {...tabProps}
          active={language === 'javascript'}
          onClick={() => onLanguage('javascript')}
        >
          main.js
        </Tab>
        <Tab
          {...tabProps}
          active={language === 'css'}
          onClick={() => onLanguage('css')}
        >
          styles.css
        </Tab>
        <Tab
          {...tabProps}
          active={language === 'html'}
          onClick={() => onLanguage('html')}
        >
          index.html
        </Tab>
      </TabBar>
      <TabContent>
        {!isPlaceholder && <Code language={language} tokens={tokens} />}
      </TabContent>
      <StatusBar
        background={colors.statusBarBackground}
        foreground={colors.statusBarForeground}
        repository={repository}
        repositoryOwner={repositoryOwner}
        extensionName={extensionName}
        publisherName={publisherName}
      />
    </Editor>
  )
}

export default ThemePreview
