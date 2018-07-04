import { LanguageOptions, Theme } from '@vscodethemes/types'
import { cx } from 'emotion'
import * as React from 'react'
import { Icon, Icons, ThemePreview } from '../'
import styles from './ThemeRotator.styles'

interface ThemeRotatorProps {
  themes: Array<Theme | undefined>
  language: LanguageOptions
  onLanguage: (language: LanguageOptions) => any
}

interface ThemeRotatorState {
  currentIndex: number
  queuedIndex: number
}

const MAX_THEMES = 4
const MAX_ZINDEX = 100
const ZINDEX_FACTOR = 10
const SCALE_FACTOR = 0.1
const TRANSLATE_FACTOR = 10

class ThemeRotator extends React.Component<
  ThemeRotatorProps,
  ThemeRotatorState
> {
  state = {
    currentIndex: 0,
    queuedIndex: 0,
  }

  nextSlide = () => {
    const { themes } = this.props
    const { currentIndex } = this.state
    // Increment queuedIndex to trigger a transition.
    this.setState({
      queuedIndex: (currentIndex + 1) % themes.length,
    })
  }

  handleSlideEnd = () => {
    const { currentIndex, queuedIndex } = this.state
    // Update the current index with the queued index.
    if (currentIndex !== queuedIndex) {
      this.setState({ currentIndex: queuedIndex })
    }
  }

  getStyles = (index: number, shouldTransition: boolean = false) => {
    const offset = shouldTransition ? 1 : 0
    return {
      zIndex: MAX_ZINDEX - index * ZINDEX_FACTOR,
      opacity: index === 0 && offset ? 0 : 1,
      transform: `
        scale(${1 - (index - offset) * SCALE_FACTOR})
        translateX(${(index - offset) * TRANSLATE_FACTOR}px)
      `,
    }
  }

  render() {
    const { themes, language, onLanguage } = this.props
    const { currentIndex, queuedIndex } = this.state
    const numOfThemes = Math.min(themes.length, MAX_THEMES)
    const numOfLayers = numOfThemes - 1
    const themesToRender: Theme[] = []
    const endIndex = currentIndex + numOfThemes
    const shouldTransition = queuedIndex !== currentIndex

    for (let i = currentIndex; i < endIndex; i += 1) {
      themesToRender.push(themes[i % themes.length])
    }

    const nextLastTheme = themes[endIndex % themes.length]

    return (
      <div
        className={styles.wrapper}
        style={{
          marginRight:
            numOfLayers * TRANSLATE_FACTOR * (1 - SCALE_FACTOR * numOfLayers),
        }}
      >
        {themesToRender.map((theme, i) => {
          const shouldRenderButton = themesToRender.length > 1 && i === 0
          return (
            <div
              key={theme.themeId}
              className={cx(styles.item, i !== 0 && styles.layer)}
              style={this.getStyles(i, shouldTransition)}
              onTransitionEnd={i === 0 ? this.handleSlideEnd : null}
            >
              <ThemePreview
                theme={theme}
                language={language}
                onLanguage={onLanguage}
                hideViewExtension={true}
              />
              {shouldRenderButton && (
                <button
                  className={styles.button}
                  style={{
                    backgroundColor: theme.colors.statusBarBackground,
                    color: theme.colors.statusBarForeground,
                  }}
                  onClick={this.nextSlide}
                >
                  <Icon icon={Icons.chevronRight} />
                </button>
              )}
            </div>
          )
        })}
        {shouldTransition && (
          <div
            className={cx(styles.item, styles.layer)}
            style={{ ...this.getStyles(themesToRender.length - 1), zIndex: 0 }}
          >
            <ThemePreview
              theme={nextLastTheme}
              language={language}
              onLanguage={onLanguage}
              hideViewExtension={true}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ThemeRotator
