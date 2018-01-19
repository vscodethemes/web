import * as React from 'react'
import styled from 'react-emotion'
import { em, Theme, ThemeProps } from '../theme'

export default styled('div')(({ theme }: ThemeProps) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: theme.spacing.md,
  maxWidth: em(220),
}))
