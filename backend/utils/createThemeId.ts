// Computes the id of a theme from it's github repository
// and path to the json definition.
export default function createThemeId(
  publisherName: string,
  extensionName: string,
  themePath: string,
): string {
  return `${publisherName}$${extensionName}$${themePath}`.toLowerCase()
}
