// Computes the id of a theme from it's github repository
// and path to the json definition.
export default function createThemeId(
  repositoryOwner: string,
  repository: string,
  themePath: string,
): string {
  return `${repositoryOwner}$${repository}$${themePath}`.toLowerCase()
}
