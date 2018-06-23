import * as React from 'react'
import { Tab } from '../'
import { DarkLink } from '../../pages/dark'
import { LightLink } from '../../pages/light'
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
        <DarkLink>
          {linkProps => (
            <Tab color={theme.colors.palette[2]} {...linkProps}>
              Dark
            </Tab>
          )}
        </DarkLink>
        <span className={styles.sep}>·</span>
        <LightLink>
          {linkProps => (
            <Tab color={theme.colors.palette[3]} {...linkProps}>
              Light
            </Tab>
          )}
        </LightLink>
      </React.Fragment>
    )}
  </div>
)

export default Header
