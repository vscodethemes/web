import * as React from 'react'
import styled from 'react-emotion'
import { Theme } from '../theme'

export default styled('div')((props: { theme: Theme }) => ({
  boxSizing: 'border-box',
  margin: '0 auto',
  maxWidth: props.theme.pageWidth,
  paddingLeft: props.theme.spacing.md,
  paddingRight: props.theme.spacing.md,
}))
