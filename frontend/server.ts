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

    server.get('/trending', (req, res) => {
      app.render(req, res, '/', { ...req.query, sortBy: 'trending' })
    })

    server.get('/new', (req, res) => {
      app.render(req, res, '/', { ...req.query, sortBy: 'new' })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err: Error) => {
      if (err) {
        throw err
      }
      console.log(`> Ready on http://localhost:${port}`) // tslint:disable-line
    })
  })
  .catch(ex => {
    console.error(ex.stack) // tslint:disable-line
    process.exit(1)
  })
