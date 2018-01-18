import * as React from 'react'
import styled, { css } from 'react-emotion'
import { Theme } from '../theme'

export interface TabProps {
  active?: boolean
}

const Tab = styled('div')((props: TabProps & { theme: Theme }) => ({
  position: 'relative',
  fontWeight: 'bold',
  color: props.theme.colors.primary[500],
  ...props.active ? active(props.theme) : inactive,
}))

const active = (theme: Theme) => ({
  '::after': {
    content: `''`,
    position: 'absolute',
    bottom: -theme.spacing.sm,
    left: '50%',
    marginLeft: -2,
    height: 4,
    width: 4,
    borderRadius: 4,
    backgroundColor: theme.colors.primary[700],
  },
})

const inactive = {
  opacity: 0.6,
}

export default Tab as React.SFC<TabProps>
