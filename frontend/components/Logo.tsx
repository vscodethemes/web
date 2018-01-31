import { css } from 'emotion'
import * as React from 'react'
import { Link } from 'react-router-dom'
import theme, { em } from '../theme'

const Logo: React.SFC<{}> = () => (
  <Link to="/" className={classes.link}>
    <img className={classes.image} src={require('../assets/icon.svg')} />
    <h1 className={classes.text}>
      <span className={classes.primary}>vscode</span>
      themes
    </h1>
  </Link>
)

const classes = {
  link: css({
    color: theme.colors.primary,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    padding: `0 ${em(theme.gutters.md)}`,
    ':hover': {
      textDecoration: 'underline wavy',
    },
  }),

  image: css({
    marginTop: em(1),
    marginLeft: em(-2),
    marginRight: em(theme.gutters.xs),
    height: em(theme.fontSizes.md * 0.9),
  }),

  text: css({
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  }),

  primary: css({
    fontWeight: 'normal',
    color: theme.colors.primary,
  }),
}

export default Logo
