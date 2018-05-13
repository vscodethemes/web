import * as fs from 'fs'
import Tokenizer from '../index'
import { readJSON, templates } from './paths'

// These tests cannot be in a separate file because of an internal lib
// that uses Object.defineProperty. If Tokenizer is imported a second time,
// calling Object.defineProperty will cause an error.

const themes = ['bimbo', 'palenight', 'nord', 'hopscotch']
const languages = ['javascript']

themes.forEach(theme => {
  languages.forEach(lang => {
    test(`${theme}-${lang}`, () => {
      const themeDefinition = readJSON(`${theme}/${theme}.json`)
      const tokenizer = new Tokenizer(themeDefinition, lang)
      const lineTokens = tokenizer.tokenizeText((templates as any)[lang])
      expect(lineTokens).toEqual(readJSON(`${theme}/${theme}-${lang}.json`))
    })
  })
})
