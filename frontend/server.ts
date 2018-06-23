import * as express from 'express'
import * as next from 'next'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err: Error) => {
      if (err) {
        throw err
      }
      console.log(`> Frontend ready on http://localhost:${port}`) // tslint:disable-line
    })
  })
  .catch(err => {
    console.error(err.stack) // tslint:disable-line
    process.exit(1)
  })

// Nodemon sometimes doesn't close the port, this ensures that it does.
// https://github.com/remy/nodemon/issues/1025
process.on('SIGINT', () => process.exit())
