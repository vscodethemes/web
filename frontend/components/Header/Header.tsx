import { SingletonRouter, withRouter } from 'next/router'
import * as React from 'react'
import { SearchInput, Tab, Tabs } from '../'
import { DarkLink } from '../../pages/dark'
import { LightLink } from '../../pages/light'
import { SearchLink } from '../../pages/search'
import { TrendingLink } from '../../pages/trending'
import theme from '../../theme'
import styles from './Header.styles'
import Logo from './Logo'

interface HeaderProps {
  router: SingletonRouter
}

interface HeaderState {
  search: string
}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {
    search: String(this.props.router.query.q || ''),
  }

  searchInput: HTMLInputElement

  render() {
    const { search } = this.state

    return (
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.nav}>
            <Tabs>
              <TrendingLink>
                {(linkProps) => (
                  <Tab color={theme.colors.palette[1]} {...linkProps}>
                    Trending
                  </Tab>
                )}
              </TrendingLink>
              <span className={styles.sep}>·</span>
              <DarkLink>
                {(linkProps) => (
                  <Tab color={theme.colors.palette[2]} {...linkProps}>
                    Dark
                  </Tab>
                )}
              </DarkLink>
              <span className={styles.sep}>·</span>
              <LightLink>
                {(linkProps) => (
                  <Tab color={theme.colors.palette[3]} {...linkProps}>
                    Light
                  </Tab>
                )}
              </LightLink>
            </Tabs>
          </div>
          <div className={styles.search}>
            <SearchLink q={search}>
              {({ active, onClick, href }) => (
                <form method="GET" action={href} onSubmit={onClick}>
                  <SearchInput
                    name="q"
                    value={search}
                    active={active}
                    placeholder="Search... (ie. monokai)"
                    onChange={(value) => this.setState({ search: value })}
                  />
                </form>
              )}
            </SearchLink>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter<{}>(Header)
