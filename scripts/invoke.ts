import * as minimist from 'minimist'
import fetch from 'node-fetch'
import { Services } from '../types/static'

const args = minimist(process.argv.slice(2))

async function invoke(jobPath: string, eventPath: string) {
  const { default: job } = await import(jobPath)
  const { default: event } = eventPath ? await import(eventPath) : { default: {} }

  const services: Services = {
    fetch,
    logger: console,
    event,
    jobs: {
      create: async params => {
        console.log('Job created: ', params) // tslint:disable-line
      },
      receive: async params => {
        console.log('Job received: ', params) // tslint:disable-line
        // TODO: Allow invoke to pass job received return data via CLI.
        return {}
      },
    },
  }

  try {
    await job(services)
  } catch (err) {
    // tslint:disable-next-line no-console
    console.error(`${jobPath} errored with:`, err)
  }
}

invoke(args.job, args.event).catch(console.error)
