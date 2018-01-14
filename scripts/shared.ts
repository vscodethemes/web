export function run(fn: () => Promise<any>) {
  fn()
    .then(() => process.exit(0))
    .catch((error: Error) => {
      console.error(error) // tslint:disable-line no-console
      process.exit(1)
    })
}

export function getTerraformOutput(key: string) {
  const infra = require('../build/terraform-output.json')
  const data = infra[key]
  if (!data || data.value === undefined) {
    throw new Error(`Couldnt find key '${key}' in terraform output.`)
  }

  return data.value
}
