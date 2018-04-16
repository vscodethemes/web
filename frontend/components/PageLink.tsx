import { SearchParams } from '@vscodethemes/types'
import { css, cx } from 'emotion'
import Link from 'next/link'
import * as React from 'react'
import theme, { em } from '../theme'
import toQuery from '../utils/toQuery'
import Icon from './Icon'

interface Props {
  page: number
  params: SearchParams
  skipBackward: boolean
  skipForward: boolean
  onClick: (params: SearchParams) => any
}

const PageLink: React.SFC<Props> = ({
  page,
  params,
  skipBackward,
  skipForward,
  onClick,
}) => {
  const isActive = params.page === page && !skipBackward && !skipForward
  let contents: React.ReactNode = null

  if (skipBackward) {
    contents = <Icon className={classes.icon} icon="chevronDoubleLeft" />
  } else if (skipForward) {
    contents = <Icon className={classes.icon} icon="chevronDoubleRight" />
  } else {
    contents = page
  }

  return (
    <Link href={{ query: toQuery({ ...params, page }) }} prefetch={true}>
      <a className={cx(classes.page, isActive && classes.active)}>
        <div
          className={classes.contents}
          onClick={() => onClick({ ...params, page })}
        >
          {contents}
        </div>
      </a>
    </Link>
  )
}

const boxWidth = 20
const boxHeight = 2

const classes = {
  icon: css({
    height: em(theme.fontSizes.md),
  }),

  page: css({
    width: '100%',
    position: 'relative',
    fontSize: em(theme.fontSizes.md),
    lineHeight: em(theme.fontSizes.md),
    background: 'transparent',
    border: 'none',
    color: theme.colors.text,
    cursor: 'pointer',
    outline: 'none',
    textDecoration: 'none',
    ':hover': {
      color: theme.colors.palette[0],
    },
  }),

  active: css({
    color: theme.colors.palette[0],
    '::after': {
      content: `''`,
      position: 'absolute',
      bottom: 0,
      left: '50%',
      marginLeft: em(-boxWidth / 2),
      height: em(boxHeight),
      width: em(boxWidth),
      borderRadius: em(boxHeight),
      backgroundColor: theme.colors.palette[4],
    },
  }),

  contents: css({
    display: 'flex',
    justifyContent: 'center',
    padding: `0 0 ${em(theme.gutters.sm)}`,
  }),
}

export default PageLink
