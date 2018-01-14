// tslint:disable no-console
import * as AWS from 'aws-sdk'
import { promisify } from 'bluebird'
import * as fs from 'fs'
import * as mime from 'mime'
import * as path from 'path'
import * as webpack from 'webpack'
import * as zlib from 'zlib'
import config from '../frontend/webpack.config'
import { File } from '../types/static'
import { getTerraformOutput, run } from './shared'

const accessKeyId = process.env.TF_VAR_aws_access_key
const secretAccessKey = process.env.TF_VAR_aws_secret_key
const bucket = getTerraformOutput('s3_bucket')
const distributionId = getTerraformOutput('cf_distribution_id')

const credentials = new AWS.Credentials({ accessKeyId, secretAccessKey })
const s3 = new AWS.S3({ credentials })
const cloudfront = new AWS.CloudFront({ credentials })
const gzip = promisify(zlib.gzip)

run(async () => {
  const files = await getFiles()
  console.info('Cleaning S3...')
  await clean()
  console.info('Uploading to S3...')
  await Promise.all(files.map(upload))
  console.info('Invalidating CloudFront...')
  const invalidation = await invalidate()
  console.info('Done.')
})

async function getFiles(): Promise<File[]> {
  // Constructs the list of files that were created by the webpack compiler.
  const files = fs.readdirSync(config.output.path).map((name: string) => ({
    name,
    type: mime.getType(name),
    contents: fs.readFileSync(path.resolve(config.output.path, name)),
  }))

  return files
}

async function clean(): Promise<any> {
  const data = await s3.listObjects({ Bucket: bucket }).promise()
  const objects = data.Contents.map(obj => ({ Key: obj.Key }))

  if (objects.length) {
    const params = {
      Bucket: bucket,
      Delete: { Objects: objects },
    }
    await s3.deleteObjects(params).promise()
  }
}

async function upload(file: File): Promise<any> {
  const contents = await gzip(file.contents)
  // Cache everything except for index.html for a year.
  const expiresIn = file.name === 'index.html' ? 0 : 31536000
  const params = {
    Bucket: bucket,
    ACL: 'public-read',
    Key: file.name,
    ContentType: `${file.type};charset=utf-8`,
    ContentEncoding: 'gzip',
    CacheControl: `max-age=${expiresIn}`,
    Body: contents,
  }

  await s3.putObject(params).promise()
  console.log(`Uploaded ${file.name}.`)
}

async function invalidate(): Promise<any> {
  const params = {
    DistributionId: distributionId,
    InvalidationBatch: {
      CallerReference: `${+new Date()}`,
      Paths: {
        Quantity: 1,
        Items: ['/*'],
      },
    },
  }
  return cloudfront.createInvalidation(params).promise()
}
