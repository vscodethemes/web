import {
  Extension,
  ExtensionQueryResults,
  ExtensionRuntime,
  ExtractThemesPayload,
  ScrapeExtensionsPayloadRuntime,
  Services,
} from '@vscodethemes/types'
import { PermanentJobError, TransientJobError } from '../errors'

export const MARKETPLACE_BASE_URL = 'https://marketplace.visualstudio.com'
export const MARKETPLACE_EXTENSION_ENDPOINT =
  '/_apis/public/gallery/extensionquery'
export const GITHUB_PROPERTY_KEY =
  'Microsoft.VisualStudio.Services.Links.GitHub'
export const PACKAGE_FILE_KEY = 'Microsoft.VisualStudio.Services.VSIXPackage'

export default async function run(services: Services): Promise<any> {
  const { scrapeExtensions, extractThemes, logger } = services

  const job = await scrapeExtensions.receive()
  if (!job) {
    await extractThemes.notify()
    logger.log('No more jobs to process.')
    return
  }

  // Process the next job in the queue.
  await scrapeExtensions.notify()

  logger.log('Processing scrapeExtensions job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)
  logger.log(`Payload: ${JSON.stringify(job.payload)}`)

  try {
    if (!ScrapeExtensionsPayloadRuntime.guard(job.payload)) {
      throw new PermanentJobError('Invalid job payload.')
    }

    const { page } = job.payload
    // Fetch page from VSCode Marketplace
    const extensions = await getExtensions(services, page)
    if (extensions.length === 0) {
      logger.log('No more pages to process.')
      await scrapeExtensions.succeed(job)
      return
    }

    // Create a job to process the next page.
    await scrapeExtensions.create({ page: page + 1 })

    // Get all themes with repository URLs.
    extensions.forEach(logger.log)

    // Create a job to extract the themes of each repository.
    await Promise.all(extensions.map(extractThemes.create))

    // Job succeeded.
    await scrapeExtensions.succeed(job)

    logger.log(`
      Page: ${page}
      Extensions: ${extensions.length}
    `)
  } catch (err) {
    if (TransientJobError.is(err)) {
      logger.log(err.message)
      await scrapeExtensions.retry(job)
    } else if (PermanentJobError.is(err)) {
      logger.log(err.message)
      await scrapeExtensions.fail(job, err)
    } else {
      logger.log('Unexpected Error.')
      await scrapeExtensions.fail(job, err)
      // Rethrow error for global error handlers.
      throw err
    }
  }
}

/**
 * Fetch themes from the VSCode Marketplace for the provided page.
 */
async function getExtensions(
  services: Services,
  page: number,
): Promise<ExtractThemesPayload[]> {
  const extensions: ExtractThemesPayload[] = []
  const { fetch, logger } = services
  const url = `${MARKETPLACE_BASE_URL}${MARKETPLACE_EXTENSION_ENDPOINT}`
  const query = {
    filters: [
      {
        criteria: [
          // Not sure what this does and doesn't affect results.
          { filterType: 8, value: 'Microsoft.VisualStudio.Code' },
          // Not sure what this does and doesn't affect results.
          { filterType: 10, value: 'target:"Microsoft.VisualStudio.Code"' },
          // Not sure what this does but does filter out records.
          { filterType: 12, value: '5122' },
          { filterType: 5, value: 'Themes' },
        ],
        direction: 2, // Not sure what this does.
        pageSize: 100,
        pageNumber: page,
        sortBy: 4, // Sorts by most downloads.
        sortOrder: 0,
      },
    ],
    flags: 914, // Settings flags to 914 will return the github link.
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json;api-version=3.0-preview.1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  })

  if (!response.ok) {
    throw new TransientJobError(
      `getExtensions error: Bad response ${response.statusText}`,
    )
  }

  try {
    const data: ExtensionQueryResults = await response.json()
    data.results[0].extensions.forEach(extension => {
      if (ExtensionRuntime.guard(extension)) {
        // Sort by the lastUpdatedAt (ISO string) to get the latest version.
        const latestVersion = extension.versions.sort((a: any, b: any) =>
          b.lastUpdated.localeCompare(a.lastUpdated),
        )[0]
        // Find the property the contains extension's repository url.
        const repoUrlProp = latestVersion.properties.find(
          prop => prop.key === GITHUB_PROPERTY_KEY,
        )
        // Get the extensions package url.
        const packageUrlProp = latestVersion.files.find(
          prop => prop.assetType === PACKAGE_FILE_KEY,
        )

        if (packageUrlProp) {
          extensions.push({
            extensionId: extension.extensionId,
            extensionName: extension.extensionName,
            publisherName: extension.publisher.publisherName,
            lastUpdated: +new Date(extension.lastUpdated),
            publishedDate: +new Date(extension.publishedDate),
            releaseDate: +new Date(extension.releaseDate),
            displayName: extension.displayName,
            shortDescription: extension.shortDescription,
            packageUrl: packageUrlProp.source,
            repositoryUrl: repoUrlProp ? repoUrlProp.value : null,
            installs: extractStatistic(extension, 'install'),
            rating: extractStatistic(extension, 'averagerating'),
            ratingCount: extractStatistic(extension, 'ratingcount'),
            trendingDaily: extractStatistic(extension, 'trendingdaily'),
            trendingWeekly: extractStatistic(extension, 'trendingmonthly'),
            trendingMonthly: extractStatistic(extension, 'trendingweekly'),
          })
        } else {
          // Skip themes without github url.
          logger.log(
            `Missing property '${PACKAGE_FILE_KEY}': \n${JSON.stringify(
              extension,
            )}\n`,
          )
        }
      } else {
        // Skip themes with unexpected structure.
        logger.log(`Invalid extension: ${JSON.stringify(extension)}`)
      }
    })
  } catch (err) {
    logger.error(err)
    throw new PermanentJobError('getExtensions error: Invalid response data')
  }

  if (!extensions) {
    throw new PermanentJobError('getExtensions error: Invalid extensions')
  }

  return extensions
}

function extractStatistic(theme: Extension, name: string): number {
  const stat = theme.statistics.find((s: any) => s.statisticName === name)
  if (!stat) {
    return 0
  }
  return stat.value
}
