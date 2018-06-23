import * as React from 'react'
import { HomeLink } from '../../pages/home'
import theme from '../../theme'
import styles from './Logo.styles'

const Logo: React.SFC<{}> = () => (
  <HomeLink>
    {linkProps => (
      <a className={styles.link} {...linkProps}>
        <svg className={styles.icon} viewBox="0 0 57 57">
          <g
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            transform="translate(-4.000000, -4.000000)"
          >
            <g transform="translate(4.000000, 4.000000)">
              <rect
                fill={theme.colors.palette[1]}
                x="0"
                y="0"
                width="12"
                height="6"
                rx="3"
              />
              <rect
                fill={theme.colors.textMuted}
                x="19"
                y="0"
                width="38"
                height="6"
                rx="3"
              />
              <rect
                fill={theme.colors.textMuted}
                x="6"
                y="12"
                width="25"
                height="6"
                rx="3"
              />
              <rect
                fill={theme.colors.palette[2]}
                x="38"
                y="12"
                width="19"
                height="6"
                rx="3"
              />
              <rect
                fill={theme.colors.textMuted}
                x="32"
                y="25"
                width="25"
                height="6"
                rx="3"
              />
              <rect
                fill={theme.colors.palette[3]}
                x="12"
                y="25"
                width="12"
                height="6"
                rx="3"
              />
              <rect
                fill={theme.colors.textMuted}
                x="6"
                y="38"
                width="32"
                height="6"
                rx="3"
              />
              <rect
                fill={theme.colors.palette[4]}
                x="45"
                y="38"
                width="12"
                height="6"
                rx="3"
              />
              <rect
                fill={theme.colors.textMuted}
                x="38"
                y="51"
                width="19"
                height="6"
                rx="3"
              />
              <rect
                fill={theme.colors.palette[0]}
                x="0"
                y="51"
                width="32"
                height="6"
                rx="3"
              />
            </g>
          </g>
        </svg>
        <h1 className={styles.text}>
          <span className={styles.primary}>vscode</span>
          themes
        </h1>
      </a>
    )}
  </HomeLink>
)

export default Logo
