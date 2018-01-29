class IncrementNumber {
  constructor(number) {
    this.number = number || 0
  }

  inc() {
    // Prevent integer overflow
    if (this.number <= Number.MAX_VALUE) {
      this.number += 1
    }
  }

  toString() {
    return `Incremented number to ${this.number}`
  }
}
