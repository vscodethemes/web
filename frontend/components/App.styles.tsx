import { css } from 'emotion'
import theme, { em } from '../theme'

const headerHeight = 34
const headerHeightCollapsed = 40
const asideWidth = 250
const asideGutter = theme.gutters.lg
export const mainMinWidth = 320
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

  [`@media (max-width: ${collapseWidth}px)`]: {
    flexDirection: 'column',
    paddingTop: em(headerHeightCollapsed),
  },
})

export const header = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: em(headerHeight),
  padding: `0 ${em(containerGutter)}`,
  borderBottom: `1px solid ${theme.colors.inputBorder}`,
  backgroundColor: `${theme.colors.background}F5`, // FA = 96% transparency for 8-digit hex value.

  [`@media (max-width: ${collapseWidth}px)`]: {
    zIndex: 100,
    height: em(headerHeightCollapsed),
  },
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
    position: 'static',
    margin: 0,
    width: '100%',
  },
})

export const sortby = css({
  height: em(headerHeight),
  marginBottom: em(theme.gutters.md),

  [`@media (max-width: ${collapseWidth}px)`]: {
    position: 'fixed',
    zIndex: 200,
    top: 0,
    left: em(theme.gutters.lg),
    right: em(theme.gutters.lg),
    height: em(headerHeightCollapsed),
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 0,
  },
})

export const filters = css({
  [`@media (max-width: ${collapseWidth}px)`]: {
    padding: `${em(containerGutter)} 0`,
    borderBottom: `1px solid ${theme.colors.inputBorder}`,
  },
})

export const facets = css({
  [`@media (max-width: ${collapseWidth}px)`]: {
    display: 'flex',
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
    width: '100%',
    margin: '0 auto',
  },
})

export const footer = css({
  width: '100%',
  borderTop: `1px solid ${theme.colors.inputBorder}`,
  padding: em(containerGutter),
  display: 'flex',
  justifyContent: 'flex-end',

  [`@media (max-width: ${collapseWidth}px)`]: {
    justifyContent: 'center',
    backgroundColor: theme.colors.inputBorder,
  },
})
