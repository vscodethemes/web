// Computes the id of a theme from it's github repository
// and path to the json de.
export default function createThemeId(
  repositoryOwner: string,
  repository: string,
  themeName: string,
): string {
  const localThemeId = themeName
    // Remove special characters.
    .replace(/[^a-zA-Z0-9\s]/g, '')
    // Replace spaces with '-'.
    .replace(/\s/g, '-')

  return `${repositoryOwner}$${repository}$${localThemeId}`.toLowerCase()
}
