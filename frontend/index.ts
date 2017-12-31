import mount from './mount'
import ssr from './ssr'

if (typeof document !== 'undefined') {
  mount()
}

export default ssr
