import { css } from 'emotion'
import theme, { em } from '../theme'

const headerHeight = 34
const sortbyHeight = 38
const asideWidth = 250
const asideGutter = theme.gutters.lg
const mainMinWidth = 330
export const mainMaxWidth = 430
export const containerGutter = theme.gutters.md
export const containerWidth =
  asideWidth + asideGutter + mainMaxWidth + containerGutter * 2
export const collapseWidth =
  asideWidth + asideGutter + mainMinWidth + containerGutter * 2
const backgroundColor99 = `${theme.colors.background}F5` // FA = 96% transparency for 8-digit hex value.

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
  padding: `0 ${em(containerGutter)}`,
  borderBottom: `1px solid ${theme.colors.inputBorder}`,
  backgroundColor: backgroundColor99,

  [`@media (max-width: ${collapseWidth}px)`]: {
    zIndex: 100,
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
    width: 0,
  },
})

export const sortby = css({
  [`@media (max-width: ${collapseWidth}px)`]: {
    position: 'fixed',
    zIndex: 200,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: backgroundColor99,
    borderTop: `1px solid ${theme.colors.inputBorder}`,
    height: em(sortbyHeight),
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
})

export const filters = css({
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
  padding: em(containerGutter),
  display: 'flex',
  justifyContent: 'flex-end',

  [`@media (max-width: ${collapseWidth}px)`]: {
    justifyContent: 'center',
    marginBottom: em(sortbyHeight),
    backgroundColor: theme.colors.inputBorder,
  },
})
