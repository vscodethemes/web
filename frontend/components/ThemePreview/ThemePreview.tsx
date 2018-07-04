import { LanguageOptions, Theme } from '@vscodethemes/types'
import * as React from 'react'
import { Button } from '../'
import { ExtensionLink } from '../../pages/extension'
import ActivityBar from './ActivityBar'
import Code from './Code'
import Editor from './Editor'
import StatusBar from './StatusBar'
import Tab from './Tab'
import TabBar from './TabBar'
import TabContent from './TabContent'
import styles from './ThemePrevies.styles'
import TopBar from './TopBar'

interface ThemePreviewProps {
  theme: Theme
  language: LanguageOptions
  onLanguage: (language: LanguageOptions) => void
  hideViewExtension?: boolean
}

const ThemePreview: React.SFC<ThemePreviewProps> = ({
  theme: themeProps,
  language,
  onLanguage,
  hideViewExtension,
}) => (
  <div className={styles.container}>
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
        <div className={styles.actions}>
          {!hideViewExtension && (
            <ExtensionLink
              publisherName={themeProps.publisherName}
              extensionName={themeProps.extensionName}
            >
              {({ href, onClick }) => (
                <Button
                  label="View Extension"
                  foreground={themeProps.colors.statusBarForeground}
                  background={themeProps.colors.statusBarBackground}
                  href={href}
                  onClick={onClick}
                />
              )}
            </ExtensionLink>
          )}
        </div>
      </TabContent>
    </Editor>
    <StatusBar colors={themeProps.colors} installs={themeProps.installs} />
  </div>
)

export default ThemePreview
