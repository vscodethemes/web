// tslint:disable no-console
import * as netlify from 'netlify'
import * as path from 'path'
import { run } from './shared'

const accessToken = process.env.NETLIFY_ACCESS_TOKEN
const siteId = process.env.NETLIFY_SITE_ID

run(async () => {
  console.info('Uploading frontend...')
  await netlify.deploy({
    access_token: accessToken,
    site_id: siteId,
    dir: path.resolve(__dirname, '../build/frontend'),
  })
  console.info('Done.')
})
