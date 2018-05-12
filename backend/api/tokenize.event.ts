import createCFEvent from '../utils/createCFEvent'

const theme =
  'https://raw.githubusercontent.com/johnpapa/vscode-winteriscoming/master/themes/WinterIsComing-dark-color-theme.json'

const lang = 'javascript'

const code = `const btn = document.getElementById('btn')
let count = 0

function render() {
  btn.innerText = \`Count: \${count}\`
}

btn.addEventListener('click', () => {
  // Count from 1 to 10.
  if (count < 10) {
    count += 1
    render()
  }
})`

export default createCFEvent({ theme, lang, code })
