import { LanguageOptions, Theme } from '@vscodethemes/types'
import { cx } from 'emotion'
import * as React from 'react'
import { Heading, ThemePreview } from '../'
import theme, { em } from '../../theme'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'
import styles from './ThemeSlider.styles'

interface ThemeSliderProps {
  title: string
  description: string
  themes: Array<Theme | undefined>
  language: LanguageOptions
  onLanguage: (language: LanguageOptions) => any
  moreProps?: any
}

interface ThemeSliderState {
  currentIndex: number
  queuedIndex: number | null
  numOfVisibleItems: number
  itemWidthPercent: number
  shouldPeak: boolean
  didPeak: boolean
}

class ThemeSlider extends React.Component<ThemeSliderProps, ThemeSliderState> {
  state = {
    // The maximum number of values that can ever be visible at any screen size so
    // we can render items server-side without knowing the container's dimensions.
    numOfVisibleItems: 6,
    currentIndex: 0,
    queuedIndex: 0,
    itemWidthPercent: 0,
    shouldPeak: false,
    didPeak: false,
  }

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
      nextProps.language !== this.props.language ||
      nextState.currentIndex !== this.state.currentIndex ||
      nextState.queuedIndex !== this.state.queuedIndex ||
      nextState.shouldPeak !== this.state.shouldPeak ||
      nextState.didPeak !== this.state.didPeak
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

  nextSlide = () => {
    const { currentIndex, numOfVisibleItems } = this.state
    this.setState({
      queuedIndex: currentIndex + numOfVisibleItems,
    })
  }

  previousSlide = () => {
    const { currentIndex, numOfVisibleItems } = this.state
    this.setState({
      queuedIndex: currentIndex - numOfVisibleItems,
    })
  }

  handleSlideEnd = () => {
    const { currentIndex, queuedIndex, didPeak } = this.state
    // Update the current index with the queued index.
    if (queuedIndex !== currentIndex) {
      this.setState({ currentIndex: queuedIndex })
    }
    // The hover reset goes away when sliding to index zero so we need
    // to also reset peak here.
    if (currentIndex === 0) {
      this.setState({ shouldPeak: false })
    }
    // Reset peak state.
    if (didPeak) {
      this.setState({ didPeak: false })
    }
  }

  peak = () => {
    this.setState({ shouldPeak: true, didPeak: true })
  }

  unpeak = () => {
    this.setState({ shouldPeak: false, didPeak: true })
  }

  render() {
    const {
      title,
      description,
      themes,
      language,
      onLanguage,
      moreProps,
    } = this.props
    const {
      currentIndex,
      queuedIndex,
      numOfVisibleItems,
      itemWidthPercent,
      shouldPeak,
      didPeak,
    } = this.state

    // Ensure we stop sliding at a number that's a factor of numOfVisibleItems to
    // prevent over-sliding and have remaining space to show the "Browse all" CTA.
    const maxIndex =
      Math.floor(themes.length / numOfVisibleItems) * numOfVisibleItems -
      numOfVisibleItems
    // The themes to render in the slider is a multiple of numOfVisibleItems and bound
    // by the max index. Buffer the next page and previous page for the slide transition.
    const themesToRender: Theme[] = []
    const lowerIndex = currentIndex - numOfVisibleItems - 1
    const upperIndex = currentIndex + numOfVisibleItems * 2
    // The render index of the theme at the current index. This will be zero at index 0
    // but equal to the # of previous items at index > 0
    let renderIndex = -1
    let themeIndex = lowerIndex
    for (; themeIndex <= upperIndex; themeIndex += 1) {
      // Don't render themes before index 0 or after the max themes.
      if (themes[themeIndex] && themeIndex < maxIndex) {
        // Set the render index.
        if (currentIndex === themeIndex) {
          renderIndex = themesToRender.length
        }
        themesToRender.push(themes[themeIndex])
      }
    }
    // We are at a resting state when the current index is equal to the queued index.
    const isAtRest = queuedIndex === currentIndex
    // The slide delta is the number of items we need to slide. When we aren't sliding
    // this is zero, otherwise it's the change in queued from current index.
    const slideDelta = isAtRest ? 0 : queuedIndex - currentIndex
    // Slide left when sliding towards the next items, slide right when sliding towards
    // the previous items. Use renderIndex to compensate for the number of previous items.
    let distance = -itemWidthPercent * (renderIndex + slideDelta)
    // When duration is zero, we don't animate.
    let duration = isAtRest ? 0 : 0.5
    // Hide the previous button when we are on the first slide.
    const firstIndex = 0
    const isFirstSlide =
      currentIndex === firstIndex || queuedIndex === firstIndex
    // Hide the next buttons when we are on the last slide.
    const lastIndex = maxIndex - numOfVisibleItems
    const isLastSlide = currentIndex === lastIndex || queuedIndex === lastIndex
    // Adjust distance to show more of the previous theme when the previous button
    // is hovered over.
    if (!isFirstSlide && shouldPeak) {
      distance += itemWidthPercent / 4
    }
    // Animate the slide back after peaking the previous theme.
    if (didPeak) {
      duration = 0.25
    }

    const rowStyles = {
      transform: `translateX(${distance}%)`,
      // transition: shouldTransition
      // We should only animate when sliding because we need to offset
      // previous items with translate at resting state.
      transition:
        duration > 0 ? `transform ${duration}s ${theme.animation.bezier}` : '',
    }

    const itemWidthRemainder = 100 - numOfVisibleItems * itemWidthPercent

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
            {isLastSlide && (
              <a
                {...moreProps}
                className={styles.more}
                style={{
                  width: `calc(${itemWidthRemainder}% + ${em(
                    theme.container.gutter,
                  )})`,
                }}
              >
                View more<br />
                <span style={{ whiteSpace: 'nowrap' }}>{description}</span>
              </a>
            )}
          </div>
          <div
            className={cx(
              styles.previous,
              shouldPeak && styles.previousExpanded,
            )}
            onMouseOver={isFirstSlide ? null : this.peak}
            onMouseLeave={isFirstSlide ? null : this.unpeak}
          >
            <PreviousButton onClick={this.previousSlide} hide={isFirstSlide} />
          </div>
          <NextButton onClick={this.nextSlide} hide={isLastSlide} />
        </div>
      </div>
    )
  }
}

export default ThemeSlider
