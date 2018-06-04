import { css } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'

interface HeadingProps {
  text: string
}

const Heading: React.SFC<HeadingProps> = ({ text }) => (
  <h1 className={classes.heading}>
    <span className={classes.text}>{text}</span>
  </h1>
)

const classes = {
  heading: css({
    fontSize: 'inherit',
    fontWeight: 'inherit',
    marginTop: 0,
    marginBottom: em(theme.gutters.md),
  }),
  text: css({
    color: theme.colors.text,
    fontSize: em(theme.fontSizes.xl),
    fontWeight: 'normal',
    lineHeight: '1em',
  }),
}

export default Heading
