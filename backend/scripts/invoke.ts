import * as minimist from 'minimist'
import createServices from '../services/local'
import runAsyncScript from '../utils/runAsyncScript'

const args = minimist(process.argv.slice(2))
const handlerPath = args._[0]
const { default: event } = args.event ? require(args.event) : null // tslint:disable-line

runAsyncScript(async () => {
  const { default: handler } = await import(handlerPath)
  try {
    const data = await handler(createServices(), event)
    console.log(`\nResult\n---------`) // tslint:disable-line no-console
    console.log(data) // tslint:disable-line no-console
  } catch (err) {
    console.error(`${handlerPath} errored with:`, err) // tslint:disable-line no-console
  }
})
