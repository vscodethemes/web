import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../../theme'

export interface TopBarProps {
  name: string
}

const styles = {
  topBar: css({
    height: `${em(theme.fontSizes.xs + theme.gutters.xs * 2)}`,
    borderTopLeftRadius: em(theme.borderRadius.md),
    borderTopRightRadius: em(theme.borderRadius.md),
    boxShadow: '0px 1px 1px rgba(0,0,0,0.1)',
    zIndex: 10,
    backgroundColor: '#262626',
  }),

  name: css({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: em(theme.fontSizes.xs),
    fontWeight: 'normal',
    margin: 0,
    color: 'rgba(255, 255, 255, 0.7)',
  }),
}

const TopBar: React.SFC<TopBarProps> = ({ name }) => (
  <div className={styles.topBar}>
    <h3 className={styles.name}>{name}</h3>
  </div>
)

export default TopBar
