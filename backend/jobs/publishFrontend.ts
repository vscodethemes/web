import { promisify } from 'bluebird'
import * as MemoryFS from 'memory-fs'
import * as mime from 'mime'
import * as path from 'path'
import * as webpack from 'webpack'
import createWebpackConfig from '../../frontend/webpack.config'
import { File, Services } from '../../types/static'
import { PermanentJobError, TransientJobError } from '../errors'

export default async function run(services: Services): Promise<any> {
  const { publishFrontend, logger } = services

  const job = await publishFrontend.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  // Process the next job in the queue.
  await publishFrontend.notify()

  logger.log('Processing publishFrontend job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)

  try {
    // TODO: Pass initial props to config: data = await AppContainer.getInitialProps().
    const config = await getConfig()
    const compilation = await compile(config)
    logger.log(compilation)
    // TODO: Upload compilation to S3 bucket.
    // TODO: Invalidate CloudFront distribution.
  } catch (err) {
    if (TransientJobError.is(err)) {
      logger.log(err.message)
      await publishFrontend.retry(job)
    } else if (PermanentJobError.is(err)) {
      logger.log(err.message)
      await publishFrontend.fail(job, err)
    } else {
      logger.log('Unexpected Error.')
      await publishFrontend.fail(job, err)
      // Rethrow error for global error handlers.
      throw err
    }
  }
}

async function getConfig(): Promise<webpack.Configuration> {
  try {
    const config = await createWebpackConfig()
    return config
  } catch (err) {
    throw new TransientJobError(`Error creating config: ${err.message}`)
  }
}

async function compile(config: webpack.Configuration): Promise<File[]> {
  const compiler = webpack(config)
  const fs = new MemoryFS()
  // Configures webpack to compile to memory.
  compiler.outputFileSystem = fs

  const runCompiler = promisify(compiler.run, { context: compiler })
  const stats = await runCompiler()

  if (stats.hasErrors()) {
    throw new PermanentJobError(`Compiler error: ${stats.toJson().errors[0]}`)
  }

  const files = fs.readdirSync(config.output.path).map((name: string) => ({
    name,
    type: mime.getType(name),
    contents: fs.readFileSync(path.resolve(config.output.path, name)),
  }))

  return files
}
