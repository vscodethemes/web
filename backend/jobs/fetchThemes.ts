import { ExtensionRuntime } from '../../types/runtime'
import { Extension, ExtensionQueryResults, Services } from '../../types/static'

export const MAX_PAGES_TO_FETCH = 100
export const GITHUB_PROPERTY_NAME = 'Microsoft.VisualStudio.Services.Links.GitHub'

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

export default async function run(services: Services): Promise<string[]> {
  const themes = []
  let page = 0

  // TODO: Jobify pagination
  // const { page } = await services.jobs.fetchThemes.receive()
  // Or instead call receive for job in handler and pass in page
  // through run(services, page).
  // if (page > MAX_PAGES_TO_FETCH) return []
  // const themesForPage = await fetchMarketplaceThemes(services, page)
  // ..
  // await Promise.all(repos.map(repo => services.jobs.fetchThemes.create(page + 1)))
  // Separate notifying from creation so we can bulk create and notify once.
  // This will be useful when we create a job for each repo url but only want to
  // trigger one lambda at a time (serial).
  // await Promise.all(repos.map(repo => services.jobs.fetchThemes.notify()))

  // Fetch themes at page number for a maximum of 100 pages.
  while (page < MAX_PAGES_TO_FETCH) {
    const themesForPage = await fetchMarketplaceThemes(services, page)
    if (themesForPage.length === 0) {
      break
    }
    themes.push(...themesForPage)
    page += 1
  }

  const repos = extractRepositories(services, themes)
  const jobs = await Promise.all(repos.map(repo => services.jobs.create(repo)))

  services.logger.log(`
    Page: ${page}
    Themes Found: ${themes.length}
    Repositories: ${repos.length}
    Jobs: ${jobs.length}
  `)

  return repos
}
