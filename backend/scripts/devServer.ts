// tslint:disable no-console
import { Handler } from '@vscodethemes/types'
import * as express from 'express'
import * as minimist from 'minimist'
import * as morgan from 'morgan'
import tokenize from '../api/tokenize'
import createServices from '../services/local'
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

app.use(
  morgan(
    ':method :url :status :res[content-length] :res[cache-control] - :response-time ms',
  ),
)
app.use('/:handler', async (req: Request, res) => {
  try {
    const handler = handlers[req.params.handler] as Handler
    const event = createCFEvent(req.query, req.headers)
    const { status, headers, body } = await handler(services, event)

    res.status(status)
    for (const header of Object.keys(headers)) {
      res.setHeader(header, headers[header])
    }
    res.send(body)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.listen(port, host, () => {
  console.log(`> API ready on http://${host}:${port}`)
})

// Nodemon sometimes doesn't close the port, this ensures that it does.
// https://github.com/remy/nodemon/issues/1025
process.on('SIGINT', () => process.exit())
