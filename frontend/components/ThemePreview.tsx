import { css } from 'emotion'
import * as React from 'react'
import { Theme } from '../../types/static'
import theme, { em } from '../theme'

const ThemePreview: React.SFC<Theme> = ({
  installs,
  rating,
  trendingMonthly,
  repositoryOwner,
  repository,
  colors,
}) => <div className={styles.container} />

const styles = {
  container: css({
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    marginBottom: em(theme.gutters.lg),
    paddingTop: `${100 / (4 / 3)}%`,
    background: '#f0f0f0',
  }),
}

export default ThemePreview
