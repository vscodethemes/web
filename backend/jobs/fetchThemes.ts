import { ExtensionRuntime } from '../../types/runtime'
import { Extension, ExtensionQueryResults, Services } from '../../types/static'

export const MAX_PAGES_TO_FETCH = 100
export const GITHUB_PROPERTY_NAME = 'Microsoft.VisualStudio.Services.Links.GitHub'

export default async function run(services: Services): Promise<any> {
  const job = await services.jobs.fetchThemes.receive()
  if (!job) {
    services.logger.log('No more jobs to process.')
    return
  }

  const page = job.page
  if (page > MAX_PAGES_TO_FETCH) {
    services.logger.log('Maximum number of pages reached.')
    return
  }

  const themes = await fetchMarketplaceThemes(services, page)
  if (themes.length === 0) {
    services.logger.log('No more pages to process.')
    // Only when we have finished processing all pages do we start
    // processing the repositories.
    services.jobs.fetchRepository.notify()
    return
  }
  // Queue a job to process the next page.
  await services.jobs.fetchThemes.queue({ page: page + 1 })
  // Start processing the next page as soon as we queue the job.
  await services.jobs.fetchThemes.notify()

  const repositories = extractRepositories(services, themes)
  if (repositories.length === 0) {
    services.logger.log('No repositories to process for page.')
    return
  }
  // Queue a job for each repository url.
  await Promise.all(
    repositories.map(repository => services.jobs.fetchRepository.queue({ repository })),
  )

  services.logger.log(`
    Page: ${page}
    Themes found: ${themes.length}
    Repositories queued: ${repositories.length}
  `)
}

/**
 * Fetch themes from the VSCode Marketplace for the provided page.
 */
async function fetchMarketplaceThemes(services: Services, page: number): Promise<Extension[]> {
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

  const response = await services.fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json;api-version=3.0-preview.1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  })

  const payload: ExtensionQueryResults = await response.json()
  return payload.results[0].extensions
}

/**
 * Extracts repository urls from a list of themes.
 */
function extractRepositories(services: Services, themes: Extension[]): string[] {
  const repos: string[] = []

  themes.forEach(theme => {
    try {
      // Throws error if theme is not a valid extension type.
      ExtensionRuntime.check(theme)
      // Sort by the lastUpdatedAt (ISO string) to get the latest version.
      const latestVersion = theme.versions.sort((a, b) =>
        b.lastUpdated.localeCompare(a.lastUpdated),
      )[0]
      // Find the property the contains theme's repository url.
      const repoUrlProperty = latestVersion.properties.find(
        property => property.key === GITHUB_PROPERTY_NAME,
      )

      if (repoUrlProperty) {
        repos.push(repoUrlProperty.value)
      } else {
        throw new Error(`Missing property ${GITHUB_PROPERTY_NAME}`)
      }
    } catch (err) {
      services.logger.log(`${err.message}:`)
      services.logger.log(theme)
      services.logger.log('')
    }
  })

  return repos
}
