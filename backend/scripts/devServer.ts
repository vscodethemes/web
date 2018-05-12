import { Handler } from '@vscodethemes/types'
import * as express from 'express'
import * as minimist from 'minimist'
import * as qs from 'querystring'
import * as util from 'util'
import createServices from '../services/local'
import tokenize from '../api/tokenize'
import { AnyLengthString } from 'aws-sdk/clients/comprehend'
import { EWOULDBLOCK } from 'constants'
import createCFEvent from '../utils/createCFEvent'

const args = minimist(process.argv.slice(2))
const port = args.port || 5000
const host = args.host || 'localhost'

const services = createServices()
const app = express()

const handlers: { [key: string]: Handler } = {
  tokenize,
}

interface Request extends express.Request {
  event: any
}

app.use('/:handler', async (req: Request, res) => {
  try {
    const handler = handlers[req.params.handler] as Handler
    const event = createCFEvent(req.query, req.headers)

    console.log(`\nCalling ${req.params.handler} with event:`)
    console.log(util.inspect(event, false, 6))
    const { status, headers, body } = await handler(services, event)

    res.status(status)
    for (const header of Object.keys(headers)) {
      res.setHeader(header, headers[header])
    }
    res.send(body)
  } catch (err) {
    console.error(`/tokenize errored with:`, err) // tslint:disable-line no-console
    res.status(500).send(err)
  }
})

app.listen(port, host, () => {
  console.log(`> API ready on http://${host}:${port}`)
})
