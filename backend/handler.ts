import { JobHandlers } from '../types/static'
import extractColors from './jobs/extractColors'
import extractThemes from './jobs/extractThemes'
import saveTheme from './jobs/saveTheme'
import scrapeThemes from './jobs/scrapeThemes'
import createServices from './services/aws'

const jobName = process.env.JOB

const jobs: JobHandlers = {
  scrapeThemes,
  extractThemes,
  extractColors,
  saveTheme,
}

export default async function handler(event: any, context: AWSLambda.Context) {
  const services = createServices()

  try {
    const job = jobs[jobName]
    if (!job) {
      throw new Error(`Invalid job '${jobName}'.`)
    }

    const result = await job(services)
    context.succeed(result)
  } catch (err) {
    context.fail(err)
  }
}
