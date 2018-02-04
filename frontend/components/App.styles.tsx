import { css } from 'emotion'
import theme, { em } from '../theme'

const headerHeight = 34
const asideWidth = 250
const asideGutter = theme.gutters.lg
const mainMinWidth = 330
export const mainMaxWidth = 430
export const containerGutter = theme.gutters.md
export const containerWidth =
  asideWidth + asideGutter + mainMaxWidth + containerGutter * 2
export const collapseWidth =
  asideWidth + asideGutter + mainMinWidth + containerGutter * 2

export const container = css({
  width: '100%',
  maxWidth: em(containerWidth),
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  paddingTop: em(headerHeight),
  paddingLeft: em(containerGutter),
  paddingRight: em(containerGutter),
})

export const header = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: em(headerHeight),
  borderBottom: `1px solid ${theme.colors.inputBorder}`,
})

export const aside = css({
  position: 'fixed',
  left: '50%',
  width: em(asideWidth),
  marginTop: em(headerHeight + theme.gutters.lg),
  marginLeft: em(-containerWidth / 2 + containerGutter),

  [`@media (max-width: ${containerWidth}px)`]: {
    left: em(containerGutter),
    marginLeft: 0,
  },
  [`@media (max-width: ${collapseWidth}px)`]: {
    display: 'none',
  },
})

export const main = css({
  flex: 1,
  maxWidth: em(mainMaxWidth),

  [`@media (max-width: ${containerWidth}px)`]: {
    marginLeft: em(asideWidth + asideGutter),
  },
  [`@media (max-width: ${containerWidth}px)`]: {
    marginLeft: em(asideWidth + asideGutter),
  },
  [`@media (max-width: ${collapseWidth}px)`]: {
    margin: '0 auto',
  },
})

export const footer = css({
  width: '100%',
  borderTop: `1px solid ${theme.colors.inputBorder}`,
  paddingTop: em(theme.gutters.md),
})