import * as Emotion from 'emotion'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import { SSR } from './ssr'

interface SSRWindow extends Window {
  ssr: SSR
}

export default function mount() {
  const ssr = (window as SSRWindow).ssr
  Emotion.hydrate(ssr.cssIds)
  ReactDOM.hydrate(
    <Router>
      <App />
    </Router>,
    document.getElementById('react-root'),
  )
}
