/// <reference types="node" />
import * as path from 'path'

// Source: https://github.com/Microsoft/vscode/blob/8fdf170a0850c1cc027382f31650aaf300d3ae2a/extensions/typescript/syntaxes/TypeScript.tmLanguage.json
export const typescript = path.resolve(
  __dirname,
  './languages/typescript.tmLanguage.json',
)
// VSCode uses the typescript grammar for javascript.
export const javascript = typescript
// Source: https://github.com/Microsoft/vscode/blob/8fdf170a0850c1cc027382f31650aaf300d3ae2a/extensions/css/syntaxes/css.tmLanguage.json
export const css = path.resolve(__dirname, './languages/css.tmLanguage.json')
// Source: https://github.com/Microsoft/vscode/blob/8fdf170a0850c1cc027382f31650aaf300d3ae2a/extensions/html/syntaxes/html.tmLanguage.json
export const html = path.resolve(__dirname, './languages/html.tmLanguage.json')
