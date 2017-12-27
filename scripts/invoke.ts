import * as minimist from 'minimist'
import createServices from '../backend/services/local'

const args = minimist(process.argv.slice(2))

async function invoke(jobPath: string) {
  const { default: job } = await import(jobPath)
  try {
    await job(createServices())
  } catch (err) {
    // tslint:disable-next-line no-console
    console.error(`${jobPath} errored with:`, err)
  }
}

invoke(args._[0]).catch(console.error)
