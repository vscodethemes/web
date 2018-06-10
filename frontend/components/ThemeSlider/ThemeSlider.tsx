import { LanguageOptions, Theme } from '@vscodethemes/types'
import { cx } from 'emotion'
import * as React from 'react'
import { Heading, Icon, ThemePreview } from '../'
import styles from './ThemeSlider.styles'

interface ThemeSliderProps {
  title: string
  themes: Array<Theme | undefined>
  language: LanguageOptions
  onSlide: (index: number, numOfVisibleItems: number) => any
  onLanguage: (language: LanguageOptions) => any
}

interface ThemeSliderState {
  index: number
  previousIndex: number
  numOfVisibleItems: number
  itemWidthPercent: number
}

class ThemeSlider extends React.Component<ThemeSliderProps, ThemeSliderState> {
  state = {
    index: 0,
    previousIndex: -1,
    itemWidthPercent: 0,
    // The maximum number of values that can ever be visible at any screen size so
    // we can render items server-side without knowing the container's dimensions.
    numOfVisibleItems: 6,
  }

  queuedIndex: number = null
  rowEl: HTMLElement
  itemEl: HTMLElement

  componentDidMount() {
    this.calculateVisibleItems()
    // TODO: Recalculate with matchMedia instead.
    // window.addEventListener('resize', this.calculateVisibleItems, false)
    // window.addEventListener('orientationchange', this.calculateVisibleItems, false)
  }

  shouldComponentUpdate(
    nextProps: ThemeSliderProps,
    nextState: ThemeSliderState,
  ) {
    return (
      nextState.index !== this.state.index ||
      nextState.previousIndex !== this.state.previousIndex
    )
  }

  rowRef = (el: HTMLElement) => {
    this.rowEl = el
  }

  itemRef = (el: HTMLElement) => {
    this.itemEl = el
  }

  calculateVisibleItems = () => {
    const rowRect = this.rowEl.getBoundingClientRect()
    const itemRect = this.itemEl.getBoundingClientRect()
    const numOfVisibleItems = Math.floor(rowRect.width / itemRect.width)
    // TODO: Use the actual CSS value based on matchMedia result instead of calculating.
    const itemWidthPercent = Math.round((itemRect.width / rowRect.width) * 100)
    this.setState({ numOfVisibleItems, itemWidthPercent })
  }

  next = () => {
    const { index, numOfVisibleItems } = this.state
    this.queuedIndex = index + numOfVisibleItems
    this.setState({ previousIndex: index })
  }

  handleSlideEnd = () => {
    const index = this.queuedIndex
    this.setState({ index })
    this.queuedIndex = null
    this.props.onSlide(index, this.state.numOfVisibleItems)
  }

  render() {
    const { title, themes, language, onLanguage } = this.props
    const {
      index,
      previousIndex,
      numOfVisibleItems,
      itemWidthPercent,
    } = this.state

    // Ensure we stop sliding at a number that's a factor of numOfVisibleItems
    // so we don't over-slide. Also cap it at an arbitrary value to direct the
    // user view all themes in the category.
    const maxIndex = Math.min(
      Math.ceil(themes.length / numOfVisibleItems) * numOfVisibleItems -
        numOfVisibleItems,
      numOfVisibleItems * 20,
    )

    // The themes to render in the slider are bound by numOfVisibleItems where
    // we buffer the next page and previous page for the slide transition.
    const themesToRender: Theme[] = []
    const lowerIndex = index - numOfVisibleItems
    const upperIndex = index + numOfVisibleItems * 2
    let themeIndex = lowerIndex
    for (; themeIndex <= upperIndex; themeIndex += 1) {
      if (themes[themeIndex] && themeIndex < maxIndex) {
        themesToRender.push(themes[themeIndex])
      }
    }

    // const isAtMaxIndex = themeIndex >= maxIndex
    const shouldSlide = previousIndex === index
    const isInitialSlide = shouldSlide && index === 0
    const shouldReset = !shouldSlide && index > 0
    const delta = 3

    let slideDistance = 0
    let shouldTransition = false
    if (isInitialSlide) {
      slideDistance = -delta * itemWidthPercent
      shouldTransition = true
    } else if (shouldSlide) {
      slideDistance = -delta * itemWidthPercent * 2
      shouldTransition = true
    } else if (shouldReset) {
      slideDistance = -delta * itemWidthPercent
      shouldTransition = false
    }
    const rowStyles = {
      transform: `translateX(${slideDistance}%)`,
      transition: shouldTransition ? `transform 0.35s ease-in-out` : '',
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Heading text={title} />
        </div>
        <div className={styles.clip}>
          <div
            ref={this.rowRef}
            className={styles.row}
            style={rowStyles}
            onTransitionEnd={this.handleSlideEnd}
          >
            {themesToRender.map((t, i) => (
              <div
                ref={i === 0 && this.itemRef}
                key={t.themeId}
                className={styles.item}
              >
                <ThemePreview
                  theme={t}
                  language={language}
                  onLanguage={onLanguage}
                />
              </div>
            ))}
          </div>
          <button className={cx('button', styles.button)} onClick={this.next}>
            <Icon icon="chevronRight" className={cx('icon', styles.icon)} />
          </button>
        </div>
      </div>
    )
  }
}

export default ThemeSlider
