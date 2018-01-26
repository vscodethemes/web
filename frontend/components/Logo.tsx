import { css } from 'emotion'
import * as React from 'react'
import { Link } from 'react-router-dom'
import theme, { em } from '../theme'

const Logo: React.SFC<{}> = () => (
  <Link to="/">
    <img
      className={classes.image}
      alt="VSCodeThemes"
      src={require('../assets/logo.png')}
    />
  </Link>
)

const classes = {
  image: css({
    maxWidth: em(160),
    marginTop: em(theme.gutters.lg),
    marginBottom: em(theme.gutters.lg),
  }),
}

export default Logo
