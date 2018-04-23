import * as React from 'react'

declare module 'react' {
  type ProviderComponent<T> = new () => React.Component<{ value: T }>
  type ConsumerComponent<T> = new () => React.Component<{
    children: (value: T) => React.ReactNode
  }>

  interface ContextComponents<T> {
    Provider: ProviderComponent<T>
    Consumer: ConsumerComponent<T>
  }
  export function createContext<T>(defaultValue: T): ContextComponents<T>
}
