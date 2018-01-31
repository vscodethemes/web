class IncrementNumber {
  constructor(num) {
    this.number = parseInt(num)
  }

  inc() {
    // Prevent integer overflow
    if (this.number < Number.MAX_VALUE) {
      this.number += 1
    }
  }

  toString() {
    return `Incremented number to ${this.number}`
  }
}
