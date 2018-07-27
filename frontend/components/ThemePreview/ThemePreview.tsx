import { LanguageOptions, Theme } from '@vscodethemes/types'
import * as React from 'react'
import { Button } from '../'
import { ExtensionLink } from '../../pages/extension'
import withDefaultColors from '../../utils/withDefaultColors'
import ActivityBar from './ActivityBar'
import Code from './Code'
import Editor from './Editor'
import StatusBar from './StatusBar'
import Tab from './Tab'
import TabBar from './TabBar'
import TabContent from './TabContent'
import styles from './ThemePreview.styles'
import TitleBar from './TitleBar'

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
}) => {
  const colors = withDefaultColors(themeProps.themeType, themeProps.colors)

  return (
    <div className={styles.container}>
      <TitleBar name={themeProps.themeName} colors={colors} />
      <Editor colors={colors}>
        <ActivityBar colors={colors} />
        <TabBar colors={colors}>
          <Tab
            colors={colors}
            active={language === LanguageOptions.javascript}
            onClick={() => onLanguage(LanguageOptions.javascript)}
          >
            {LanguageOptions.javascript}
          </Tab>
          <Tab
            colors={colors}
            active={language === LanguageOptions.css}
            onClick={() => onLanguage(LanguageOptions.css)}
          >
            {LanguageOptions.css}
          </Tab>
          <Tab
            colors={colors}
            active={language === LanguageOptions.html}
            onClick={() => onLanguage(LanguageOptions.html)}
          >
            {LanguageOptions.html}
          </Tab>
        </TabBar>
        <TabContent>
          <Code
            tokens={themeProps.tokens}
            editorForeground={colors.editorForeground}
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
                    foreground={colors.statusBarForeground}
                    background={colors.statusBarBackground}
                    href={href}
                    onClick={onClick}
                  />
                )}
              </ExtensionLink>
            )}
          </div>
        </TabContent>
      </Editor>
      <StatusBar colors={colors} installs={themeProps.installs} />
    </div>
  )
}

export default ThemePreview
