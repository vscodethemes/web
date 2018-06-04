import { LanguageOptions, Theme } from '@vscodethemes/types'
import { css, cx } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'
import { Heading, Icon, ThemePreview } from './'

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
    const { themes } = this.props
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

    const isAtMaxIndex = themeIndex >= maxIndex
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
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <Heading text={title} />
        </div>
        <div className={classes.clip}>
          <div
            ref={this.rowRef}
            className={classes.row}
            style={rowStyles}
            onTransitionEnd={this.handleSlideEnd}
          >
            {themesToRender.map((t, i) => (
              <div
                ref={i === 0 && this.itemRef}
                key={t.themeId}
                className={classes.item}
              >
                <ThemePreview
                  theme={t}
                  language={language}
                  onLanguage={onLanguage}
                />
              </div>
            ))}
          </div>
          <button className={cx('button', classes.button)} onClick={this.next}>
            <Icon icon="chevronRight" className={cx('icon', classes.icon)} />
          </button>
        </div>
      </div>
    )
  }
}

const shadowSize = 30
const buttonSize = [64, 128]
const buttonOffset = theme.gutters.md

const classes = {
  wrapper: css({
    ':hover .button': {
      opacity: 1,
    },
  }),

  title: css({
    paddingLeft: em(theme.container.gutter),
  }),

  clip: css({
    position: 'relative',
    overflow: 'hidden',
    // Compensate for overflow: hidden and shadow.
    marginTop: em(-shadowSize),
    marginBottom: em(-shadowSize),
    padding: em(shadowSize),
    paddingLeft: em(theme.container.gutter),
  }),

  row: css({
    display: 'flex',
    marginLeft: em(-theme.gutters.md / 2),
    width: `calc(100% + ${em(theme.gutters.md / 2)})`,
  }),

  item: css({
    // Ensure there is always a fraction of the next item visible.
    // TODO: Use media queries to change this value.
    width: '30%',
    flexShrink: 0,
    paddingLeft: em(theme.gutters.md / 2),
    paddingRight: em(theme.gutters.md / 2),
  }),

  button: css({
    opacity: 0,
    position: 'absolute',
    fontSize: 'inherit',
    right: 0,
    top: '50%',
    marginTop: em(-buttonSize[1] / 2),
    width: em(buttonSize[0] + buttonOffset),
    height: em(buttonSize[1]),
    paddingRight: em(buttonOffset),
    background: `${theme.colors.backgroundDark}F0`,
    color: theme.colors.text,
    border: `1px solid ${theme.colors.backgroundDark}`,
    borderRight: 'none',
    borderTopLeftRadius: em(theme.borderRadius.md),
    borderBottomLeftRadius: em(theme.borderRadius.md),
    boxShadow: theme.shadows.md,
    cursor: 'pointer',
    transform: `translateX(${em(buttonOffset)})`,
    transition: `opacity 0.15s ease-in, transform 0.15s ease-in`,

    ':hover': {
      transform: `translateX(0)`,
    },

    ':hover .icon': {
      transform: `scaleY(1) translateX(${em(buttonOffset / 2)})`,
    },

    ':active .icon': {
      transform: `scaleY(0.85) translateX(${em(buttonOffset / 2)})`,
    },
  }),

  icon: css({
    height: em(40),
    transform: 'scaleY(0.85) translateX(0em)',
    transition: 'transform 0.15s ease-in',
  }),
}

export default ThemeSlider
