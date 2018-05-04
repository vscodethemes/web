// Computes the id of a theme from it's github repository
// and path to the json de.
export default function createThemeId(
  repositoryOwner: string,
  repository: string,
  repositoryPath: string,
): string {
  return `${repositoryOwner}$${repository}$${repositoryPath}`
}
