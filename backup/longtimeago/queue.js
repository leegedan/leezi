class Queue {
  constructor() {
    this.dataStore = []
  }
  get length() {
    return this.dataStore.length
  }

  enqueue(element) {
    this.dataStore.push(element)
  }
  dequeue() {
    return this.dataStore.shift()
  }

  front() {
    return this.dataStore[0]
  }
  back() {
    return this.dataStore[this.dataStore.length - 1]
  }
  // empty() {
  //   this.dataStore = []
  // }
  isEmpty() {
    return this.dataStore.length === 0
  }
  toString() {
    return String(this.dataStore)
  }

  [Symbol.iterator]() {
    let i = -1
    let dataStore = this.dataStore

    return {
      next() {
        i++
        return {
          done: i === dataStore.length,
          value: dataStore[i],
        }
      },
    }
  }
}
