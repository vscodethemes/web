import * as React from 'react'

interface UserContext {
  isDesktop: boolean
}

const { Provider, Consumer } = React.createContext<UserContext>({
  isDesktop: false,
})

export const UserProvider = Provider
export const UserConsumer = Consumer
