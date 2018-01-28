import { css } from 'emotion'
import * as React from 'react'
import { LanguageOptions, Theme } from '../../../types/static'
import ActivityBar from './ActivityBar'
import Code from './Code'
import Editor from './Editor'
import StatusBar from './StatusBar'
import Tab from './Tab'
import TabBar from './TabBar'
import TabContent from './TabContent'
import TopBar from './Topbar'

interface ThemePreviewProps extends Theme {
  language: LanguageOptions
  onLanguage: (language: LanguageOptions) => void
}

const ThemePreview: React.SFC<ThemePreviewProps> = ({
  name,
  type,
  installs,
  rating,
  trendingMonthly,
  repositoryOwner,
  repository,
  colors,
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
          index.js
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
          document.html
        </Tab>
      </TabBar>
      <TabContent>
        <Code language={language} />
      </TabContent>
      <StatusBar
        background={colors.statusBarBackground}
        foreground={colors.statusBarForeground}
        repository={repository}
        repositoryOwner={repositoryOwner}
        installs={installs}
        rating={rating}
      />
    </Editor>
  )
}

export default ThemePreview
