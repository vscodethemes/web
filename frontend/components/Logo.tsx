import { css } from 'emotion'
import * as React from 'react'
import { defaultSearchParams } from '../constants'
import SearchLink from '../pages/SearchPage/SearchLink'
import theme, { em } from '../theme'

interface LogoProps {
  onClick?: () => any
}

const Logo: React.SFC<LogoProps> = ({ onClick }) => (
  <SearchLink params={defaultSearchParams}>
    <a className={classes.link}>
      <div className={classes.linkInner} onClick={onClick}>
        <svg className={classes.icon} viewBox="0 0 57 57">
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
        <h1 className={classes.text}>
          <span className={classes.primary}>vscode</span>
          themes
        </h1>
      </div>
    </a>
  </SearchLink>
)

const classes = {
  link: css({
    height: '100%',
    textDecoration: 'none',
  }),

  linkInner: css({
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    color: theme.colors.palette[0],
    ':hover': {
      textDecoration: 'underline wavy',
    },
  }),

  icon: css({
    marginTop: em(1.5),
    marginRight: em(theme.gutters.xs),
    height: em(theme.fontSizes.md * 0.9),
  }),

  text: css({
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    color: theme.colors.text,
    letterSpacing: em(-0.3),

    [theme.breakpoints.pageMin]: {
      display: 'none',
    },
  }),

  primary: css({
    fontWeight: 'normal',
    color: theme.colors.palette[0],
    letterSpacing: em(0.3),
  }),
}

export default Logo
