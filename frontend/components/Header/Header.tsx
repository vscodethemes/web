import { SingletonRouter, withRouter } from 'next/router'
import * as React from 'react'
import { SearchInput, Tab } from '../'
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
  static getDerivedStateFromProps(props: HeaderProps) {
    return {
      search: String(props.router.query.q || ''),
    }
  }

  state = {
    search: '',
  }

  searchInput: HTMLInputElement

  render() {
    const { search } = this.state

    return (
      <div className={styles.header}>
        <Logo />
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
        <SearchLink>
          {({ push }) => (
            <form
              onSubmit={e => {
                e.preventDefault()
                if (search) {
                  push({ q: search })
                }
              }}
            >
              <SearchInput
                value={search}
                placeholder="Search... (ie. monokai)"
                onChange={value => this.setState({ search: value })}
              />
            </form>
          )}
        </SearchLink>
      </div>
    )
  }
}

export default withRouter<{}>(Header)
