import { LanguageOptions, Theme } from '@vscodethemes/types'
import { cx } from 'emotion'
import getConfig from 'next/config'
import * as React from 'react'
import {
  Button,
  Heading,
  Icon,
  Icons,
  Paragraph,
  ThemeRotator,
  DropdownItem,
} from '../../components'
import styles from './Extension.styles'

interface ExtensionProps {
  displayName: string
  shortDescription: string
  publisherName: string
  extensionName: string
  repositoryUrl?: string
  themes: Theme[]
  language: LanguageOptions
  onLanguage: (language: LanguageOptions) => any
  onClose?: () => any
}

interface ExtensionState {
  selectedTheme: Theme
}

const { publicRuntimeConfig } = getConfig()
const { host } = publicRuntimeConfig

class Extension extends React.Component<ExtensionProps, ExtensionState> {
  state = {
    selectedTheme: this.props.themes[0],
  }

  render() {
    const {
      displayName,
      shortDescription,
      publisherName,
      extensionName,
      repositoryUrl,
      themes,
      language,
      onLanguage,
      onClose,
    } = this.props

    const { selectedTheme } = this.state

    console.log(selectedTheme)

    return (
      <div className={styles.wrapper}>
        <div className={styles.preview}>
          <ThemeRotator
            themes={themes}
            language={language}
            onLanguage={onLanguage}
            onNext={(selectedTheme) => {
              this.setState({ selectedTheme })
            }}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.heading}>
            <Heading text={displayName} />
            {onClose && (
              <a
                className={cx(styles.link, styles.close)}
                href="javascript:;"
                onClick={onClose}
              >
                <Icon icon={Icons.close} />
              </a>
            )}
          </div>
          <span className={styles.owner}>by {publisherName}</span>
          <Paragraph text={shortDescription} />
          <div className={styles.actions}>
            <span className={styles.install}>
              <Button
                icon={Icons.download}
                label="Open in VSCode"
                href={`vscode:extension/${publisherName}.${extensionName}`}
              >
                <DropdownItem
                  label="Open in vscode.dev"
                  target="preview"
                  href={`https://vscode.dev/theme/${publisherName}.${extensionName}/${encodeURIComponent(
                    selectedTheme.themeName,
                  )}`}
                />
              </Button>
            </span>
            <a
              className={styles.link}
              target="_blank"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `${displayName} by ${publisherName}`,
              )}&url=${encodeURIComponent(
                `${host}/e/${publisherName}.${extensionName}`,
              )}&hashtags=vscode`}
            >
              <Icon icon={Icons.twitter} />
            </a>
            {repositoryUrl && (
              <a className={styles.link} href={repositoryUrl}>
                <Icon icon={Icons.github} />
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Extension
