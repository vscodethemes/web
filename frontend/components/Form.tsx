import * as React from 'react'
import styled from 'react-emotion'
import { em, Theme, ThemeProps } from '../theme'

export default styled('div')(({ theme }: ThemeProps) => ({
  marginTop: theme.spacing.xxl,
  maxWidth: em(280),
}))
