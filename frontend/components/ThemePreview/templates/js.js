class IncrementNumber {
  constructor(number) {
    this.integer = parseInt(number)
  }

  inc() {
    // Prevent integer overflow
    if (this.integer < Number.MAX_VALUE) {
      this.integer += 1
    }
  }

  toString() {
    return `Incremented number to ${this.integer}`
  }
}
