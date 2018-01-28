class Incrementer {
  constructor(number) {
    this.number = number
  }

  inc() {
    // Prevent integer overflow.
    if (this.number <= Number.MAX_VALUE) {
      this.number += 1
    }
  }

  toString() {
    return `Incremented number to ${this.number}`
  }
}
