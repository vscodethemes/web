// import * as AWS from 'aws-sdk'
import { promisify } from 'bluebird'
import * as MemoryFS from 'memory-fs'
import * as mime from 'mime'
import * as path from 'path'
import * as webpack from 'webpack'
// import * as zlib from 'zlib'
import createWebpackConfig from '../../frontend/webpack.config'
import { File, Services } from '../../types/static'
import { PermanentJobError, TransientJobError } from '../errors'

// const s3 = new AWS.S3()
// const cloudfront = new AWS.CloudFront()
// const gzip = promisify(zlib.gzip)

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
    const config = await getConfig()
    const files = await compile(config)
    logger.log(files)
    // await Promise.all(files.map(serivces.uploadFile))
    // await services.invalidatePath('/*')
    await publishFrontend.succeed(job)
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

// async function upload(file: File): Promise<any> {
//   const contents = await gzip(file.contents)
//   // cache html for 15 minutes and other assets for 2 hours
//   const expiresIn = file.type === 'text/html' ? 900 : 7200

//   const params = {
//     Bucket: process.env.S3_BUCKET,
//     ACL: 'public-read',
//     Key: file.name,
//     ContentType: `${file.type};charset=utf-8`,
//     ContentEncoding: 'gzip',
//     CacheControl: `max-age=${expiresIn}`,
//     Body: contents,
//   }

//   return s3.putObject(params).promise()
// }

// async function invalidate(): Promise<any> {
//   const params = {
//     DistributionId: process.env.CF_DISTRIBUTION,
//     InvalidationBatch: {
//       CallerReference: `${+(new Date())}`,
//       Paths: {
//         Quantity: 1,
//         Items: ['/*']
//       }
//     }
//   }

//   return cloudfront.createInvalidation(params).promise()
// }
