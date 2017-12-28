import {
  ExtensionRuntime,
  ScrapeThemesPayloadRuntime,
} from '../../types/runtime'
import {
  Extension,
  ExtensionQueryResults,
  ExtractThemesPayload,
  RepositoryInfo,
  Services,
} from '../../types/static'
import { PermanentJobError, TransientJobError } from '../errors'

export const GITHUB_PROPERTY_NAME =
  'Microsoft.VisualStudio.Services.Links.GitHub'

export default async function run(services: Services): Promise<any> {
  const { scrapeThemes, extractThemes, logger } = services

  const job = await scrapeThemes.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  logger.log('Proccessing scrapeThemes job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)
  logger.log(`Payload: ${JSON.stringify(job.payload)}`)

  try {
    if (!ScrapeThemesPayloadRuntime.guard(job.payload)) {
      throw new PermanentJobError('Invalid job payload.')
    }

    const { page } = job.payload
    // Fetch page from VSCode Marketplace
    const themes = await fetchMarketplaceThemes(services, page)
    if (themes.length === 0) {
      logger.log('No more pages to process.')
      await scrapeThemes.succeed(job)
      return
    }
    // Create a job to process the next page.
    await scrapeThemes.create({ page: page + 1 })
    // Process the next job in the queue.
    await scrapeThemes.notify()

    // Get all themes with repository URLs.
    const themesWithRepos = filterThemes(services, themes)
    if (themesWithRepos.length === 0) {
      logger.log('No themes extracted for page.')
      return
    }

    logger.log(themesWithRepos)

    // Create a job to extract the themes of each repository.
    await Promise.all(
      themesWithRepos.map(async theme => {
        await extractThemes.create(theme)
        // Start the extract themes job.
        await extractThemes.notify()
      }),
    )

    // Job succeeded.
    await scrapeThemes.succeed(job)

    logger.log(`
      Page: ${page}
      Themes for page: ${themes.length}
      Themes with repos: ${themesWithRepos.length}
    `)
  } catch (err) {
    if (TransientJobError.is(err)) {
      logger.log(err.message)
      await scrapeThemes.retry(job)
    } else if (PermanentJobError.is(err)) {
      logger.log(err.message)
      await scrapeThemes.fail(job, err)
    } else {
      logger.log('Unexpected Error.')
      await scrapeThemes.fail(job, err)
      // Rethrow error for global error handlers.
      throw err
    }
  }
}

/**
 * Fetch themes from the VSCode Marketplace for the provided page.
 */
async function fetchMarketplaceThemes(
  services: Services,
  page: number,
): Promise<Extension[]> {
  let themes = []
  const { fetch, logger } = services
  const url = `https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery`
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
      `fetchMarketplaceThemes error: Bad response ${response.statusText}`,
    )
  }

  try {
    const data: ExtensionQueryResults = await response.json()
    themes = data.results[0].extensions
  } catch (err) {
    logger.error(err)
    throw new PermanentJobError(
      'fetchMarketplaceThemes error: Invalid response data',
    )
  }

  if (!themes) {
    throw new PermanentJobError('fetchMarketplaceThemes error: Invalid themes')
  }

  return themes
}

/**
 * Extracts repository urls from a list of themes.
 */
function filterThemes(
  services: Services,
  themes: Extension[],
): ExtractThemesPayload[] {
  const { logger } = services
  const extracted: ExtractThemesPayload[] = []

  themes.forEach(theme => {
    if (ExtensionRuntime.guard(theme)) {
      // Sort by the lastUpdatedAt (ISO string) to get the latest version.
      const latestVersion = theme.versions.sort((a, b) =>
        b.lastUpdated.localeCompare(a.lastUpdated),
      )[0]
      // Find the property the contains theme's repository url.
      const repoUrlProp = latestVersion.properties.find(
        prop => prop.key === GITHUB_PROPERTY_NAME,
      )

      if (repoUrlProp) {
        extracted.push({
          ...extractRepositoryInfo(repoUrlProp.value),
          stats: {
            installs: extractStatistic(theme, 'install'),
            rating: extractStatistic(theme, 'averagerating'),
            ratingCount: extractStatistic(theme, 'ratingcount'),
            trendingDaily: extractStatistic(theme, 'trendingdaily'),
            trendingWeekly: extractStatistic(theme, 'trendingmonthly'),
            trendingMonthly: extractStatistic(theme, 'trendingweekly'),
          },
        })
      } else {
        // Skip themes without github url.
        logger.log(
          `Missing property '${GITHUB_PROPERTY_NAME}': \n${JSON.stringify(
            theme,
          )}\n`,
        )
      }
    } else {
      // Skip themes with unexpected structure.
      logger.log(`Invalid theme: ${JSON.stringify(theme)}`)
    }
  })

  return extracted
}

function extractRepositoryInfo(url: string): RepositoryInfo {
  const [repositoryOwner, repository] = url
    .replace(/^(https:\/\/)?(www\.)?github\.com\//, '')
    .replace(/\.git$/, '')
    .split('/')

  return { repository, repositoryOwner }
}

function extractStatistic(theme: Extension, name: string): number {
  const stat = theme.statistics.find(s => s.statisticName === name)
  if (!stat) {
    return 0
  }
  return stat.value
}
