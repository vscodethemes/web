import * as minimist from 'minimist'
import createServices from '../services/local'
import { run } from './shared'

const args = minimist(process.argv.slice(2))
const jobPath = args._[0]

run(async () => {
  const { default: job } = await import(jobPath)
  try {
    await job(createServices())
  } catch (err) {
    // tslint:disable-next-line no-console
    console.error(`${jobPath} errored with:`, err)
  }
})
