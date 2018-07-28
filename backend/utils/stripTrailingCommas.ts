// Find every ',' after which there is a closing bracket ('}' or ']').
// Closing brackets might be placed after a bunch of space-like symbols.
// https://stackoverflow.com/a/34347475/1249098
export default function stripTrailingCommas(str: string) {
  return str.replace(/\,(?=\s*?[\}\]])/g, '')
}
