import { Html5Entities } from 'html-entities'
import { LineToken } from '../'

const entities = new Html5Entities()

export default function toHTML(tokens: LineToken[][]) {
  let html = ''

  tokens.forEach(lineTokens => {
    html += '<div>'
    lineTokens.forEach(({ token, style }) => {
      if (!token) {
        html += '<br />'
      } else {
        let styleStr = ''
        if (style.color) styleStr += `color:${style.color};`
        if (style.fontStyle) styleStr += `font-style:${style.fontStyle};`
        if (style.fontWeight) styleStr += `font-weight:${style.fontWeight};`

        const text = entities.encode(token).replace(/\s/g, '&nbsp;')
        html += `<span style="${styleStr}">${text}</span>`
      }
    })
    html += '</div>'
  })

  return html
}
