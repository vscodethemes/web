import { css } from 'emotion'
import theme, { em } from '../theme'

const headerHeight = 34
const asideWidth = 250
const mainWidth = 450
const containerGutter = theme.gutters.md
const asideGutter = theme.gutters.xl
const containerWidth =
  asideWidth + asideGutter + mainWidth + containerGutter * 2
const breakpoints = [containerWidth]

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
  marginLeft: em(-asideWidth - asideGutter - asideGutter / 2),

  [`@media (max-width: ${breakpoints[0]}px)`]: {
    left: em(containerGutter),
    marginLeft: 0,
  },
})

export const main = css({
  flex: 1,
  maxWidth: em(mainWidth),
  [`@media (max-width: ${breakpoints[0]}px)`]: {
    marginLeft: em(asideWidth + containerGutter),
  },
})
