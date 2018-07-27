import { Colors } from '@vscodethemes/types'
import { css } from 'emotion'
import * as React from 'react'
import theme, { rem } from '../../theme'

export interface TitleBarProps {
  name: string
  colors: Colors
  active?: boolean
}

const styles = {
  titleBar: css({
    height: `${rem(theme.fontSizes.xs + theme.gutters.xs * 2)}`,
    borderTopLeftRadius: rem(theme.borderRadius.md),
    borderTopRightRadius: rem(theme.borderRadius.md),
    boxShadow: '0px 1px 1px rgba(0,0,0,0.1)',
    zIndex: 10,
  }),

  name: css({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: rem(theme.fontSizes.xs),
    fontWeight: 'normal',
    margin: 0,
  }),
}

const TitleBar: React.SFC<TitleBarProps> = ({
  name,
  colors,
  active = true,
}) => (
  <div
    className={styles.titleBar}
    style={{
      background: active
        ? colors.titleBarActiveBackground
        : colors.titleBarInactiveBackground,
      borderBottom: colors.titleBarBorder
        ? `1px solid ${colors.titleBarBorder}`
        : '',
    }}
  >
    <h3
      className={styles.name}
      style={{
        color: active
          ? colors.titleBarActiveForeground
          : colors.titleBarInactiveForeground,
      }}
    >
      {name}
    </h3>
  </div>
)

export default TitleBar
