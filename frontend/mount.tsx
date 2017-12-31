import * as Emotion from 'emotion'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AppContainer from './components/AppContainer'
import { SSR } from './ssr'

interface SSRWindow extends Window {
  ssr: SSR
}

export default function mount() {
  const ssr = (window as SSRWindow).ssr
  Emotion.hydrate(ssr.cssIds)
  ReactDOM.hydrate(<AppContainer />, document.getElementById('react-root'))
}
