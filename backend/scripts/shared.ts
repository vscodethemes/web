export function run(fn: () => Promise<any>) {
  fn()
    .then(() => process.exit(0))
    .catch((error: Error) => {
      console.error(error) // tslint:disable-line no-console
      process.exit(1)
    })
}
