import '@babel/polyfill'
import * as Emotion from 'emotion'
import * as Raven from 'raven-js'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import { SSR } from './ssr'

interface SSRWindow extends Window {
  ssr: SSR
}

const sentryDsn = process.env.SENTRY_DSN

export default function mount() {
  if (sentryDsn) {
    const ravenConfig: Raven.RavenOptions = {
      environment: process.env.NODE_ENV,
      tags: {
        subject: 'frontend',
        commit: process.env.TRAVIS_COMMIT,
      },
    }
    Raven.config(sentryDsn, ravenConfig).install()
  }

  const ssr = (window as SSRWindow).ssr
  Emotion.hydrate(ssr.cssIds)
  ReactDOM.hydrate(
    <Router>
      <App />
    </Router>,
    document.getElementById('react-root'),
  )
}
