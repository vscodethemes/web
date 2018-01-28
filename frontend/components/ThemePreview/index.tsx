import { css } from 'emotion'
import * as React from 'react'
import { Theme } from '../../../types/static'
import ActivityBar from './ActivityBar'
import Editor from './Editor'
import StatusBar from './StatusBar'
import Tab from './Tab'
import TabBar from './TabBar'
import TopBar from './Topbar'

const ThemePreview: React.SFC<Theme> = ({
  name,
  type,
  installs,
  rating,
  trendingMonthly,
  repositoryOwner,
  repository,
  colors,
}) => (
  <Editor background={colors.editorBackground}>
    <TopBar name={name} type={type} />
    <ActivityBar background={colors.activityBarBackground} />
    <TabBar
      background={colors.editorGroupHeaderTabsBackground}
      border={colors.editorGroupHeaderTabsBorder}
    >
      <Tab
        background={colors.tabActiveBackground}
        border={colors.tabBorder}
        borderBottom={colors.tabActiveBorder}
      />
      <Tab
        background={colors.tabInactiveBackground}
        border={colors.tabBorder}
      />
    </TabBar>
    <StatusBar background={colors.statusBarBackground} />
  </Editor>
)

export default ThemePreview
