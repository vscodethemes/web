import * as fs from 'fs'
import * as path from 'path'

export const readText = (relPath: string) =>
  fs.readFileSync(path.resolve(__dirname, relPath)).toString()

export const readJSON = (relPath: string) =>
  JSON.parse(fs.readFileSync(path.resolve(__dirname, relPath)).toString())

export const templates = {
  javascript: readText('./templates/javascript.js'),
  css: readText('./templates/css.css'),
  html: readText('./templates/html.html'),
}
