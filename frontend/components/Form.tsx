import * as React from 'react'
import styled from 'react-emotion'
import { Theme } from '../theme'

export default styled('div')((props: { theme: Theme }) => ({
  marginTop: props.theme.spacing.xxl,
  maxWidth: props.theme.formWidth,
}))
