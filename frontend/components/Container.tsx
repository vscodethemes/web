import * as React from 'react'
import styled from 'react-emotion'
import { em, Theme } from '../theme'

export default styled('div')((props: { theme: Theme }) => ({
  margin: '0 auto',
  maxWidth: em(840),
  paddingLeft: props.theme.spacing.md,
  paddingRight: props.theme.spacing.md,
}))
