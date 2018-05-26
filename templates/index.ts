import { LanguageOptions } from '@vscodethemes/types'
import cssTemplate from './css'
import htmlTemplate from './html'
import jsTemplate from './javascript'

export default {
  [LanguageOptions.javascript]: jsTemplate,
  [LanguageOptions.css]: cssTemplate,
  [LanguageOptions.html]: htmlTemplate,
}
