import * as React from 'react'
import { Tab } from '../'
import { TrendingLink } from '../../pages/trending'
import theme from '../../theme'
import styles from './Header.styles'
import Logo from './Logo'

interface HeaderProps {
  hideCategories?: boolean
}

const Header: React.SFC<HeaderProps> = ({ hideCategories = false }) => (
  <div className={styles.header}>
    <Logo />
    {!hideCategories && (
      <React.Fragment>
        <TrendingLink>
          {linkProps => (
            <Tab color={theme.colors.palette[1]} {...linkProps}>
              Trending
            </Tab>
          )}
        </TrendingLink>
        <span className={styles.sep}>·</span>
        <Tab color={theme.colors.palette[2]}>Dark</Tab>
        <span className={styles.sep}>·</span>
        <Tab color={theme.colors.palette[3]}>Light</Tab>
      </React.Fragment>
    )}
  </div>
)

export default Header
