import fetchThemes from './jobs/fetchThemes'
// import fetchRepository from './jobs/fetchRepository'
import createServices from './services/aws'

const jobName = process.env.JOB

export default async function handler(event, context) {
  const services = createServices()

  try {
    let result
    if (jobName === 'fetchThemes') {
      result = await fetchThemes(services)
    } else if (jobName === 'fetchRepository') {
      // result = await fetchRepository(services)
    } else {
      throw new Error(`Invalid job '${jobName}'.`)
    }
    context.done(result)
  } catch (err) {
    context.fail(err)
  }
}
