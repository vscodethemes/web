import * as express from 'express'
import * as createApp from 'next'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = createApp({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use((req, res, next) => {
      // Cache each SSR page for 4 hours at the CDN, don't cache on the client.
      res.setHeader('Cache-Control', `max-age=0, s-maxage=${60 * 60 * 4}`)
      next()
    })

    server.get('/', (req, res) => {
      app.render(req, res, '/home', req.query)
    })

    server.get('/trending', (req, res) => {
      app.render(req, res, '/trending', req.query)
    })

    server.get('/light', (req, res) => {
      app.render(req, res, '/light', req.query)
    })

    server.get('/dark', (req, res) => {
      app.render(req, res, '/dark', req.query)
    })

    server.get('/search', (req, res) => {
      app.render(req, res, '/search', req.query)
    })

    server.get('/e/:id*', (req, res) => {
      const [publisherName, extensionName] = req.params.id.split('.')
      app.render(req, res, '/extension', {
        ...req.query,
        publisherName,
        extensionName,
      })
    })

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
    console.error(err) // tslint:disable-line
    process.exit(1)
  })
