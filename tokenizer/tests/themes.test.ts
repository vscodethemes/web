import * as fs from 'fs'
import Tokenizer from '../'
import { readJSON, templates } from './paths'

// These tests cannot be in a separate file because of an internal lib
// that uses Object.defineProperty. If executed a second time, calling
// Object.defineProperty will cause and error.

const themes = ['palenight', 'nord', 'hopscotch']
const languages = ['javascript']

themes.forEach(theme => {
  languages.forEach(lang => {
    test(`${theme}-${lang}`, () => {
      const { tokenColors: themeSettings } = readJSON(`${theme}/${theme}.json`)
      const tokenizer = new Tokenizer(themeSettings, lang)
      const lineTokens = tokenizer.tokenizeText((templates as any)[lang])
      expect(lineTokens).toEqual(readJSON(`${theme}/${theme}-${lang}.json`))
    })
  })
})
