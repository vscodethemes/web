import { css } from 'emotion'
import * as React from 'react'
import { LanguageOptions, Theme } from '../../../types/static'
import theme, { em } from '../../theme'
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
    <div className={classes.container}>
      <TopBar name={name} type={type} />
      <Editor colors={colors}>
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
      </Editor>
      <StatusBar
        colors={colors}
        repository={repository}
        repositoryOwner={repositoryOwner}
        extensionName={extensionName}
        publisherName={publisherName}
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
