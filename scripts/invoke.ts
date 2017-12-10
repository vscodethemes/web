import * as minimist from 'minimist'
import createServices from '../backend/services/local'

const args = minimist(process.argv.slice(2))

async function invoke(jobPath: string, eventPath: string) {
  const { default: job } = await import(jobPath)
  const { default: event } = eventPath ? await import(eventPath) : { default: {} }

  try {
    await job(createServices())
  } catch (err) {
    // tslint:disable-next-line no-console
    console.error(`${jobPath} errored with:`, err)
  }
}

invoke(args.job, args.event).catch(console.error)
