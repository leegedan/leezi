class Stack {
  constructor() {
    this.dataStore = []
    this.top = 0
  }
  get length() {
    return this.top
  }

  push(element) {
    // this.top = this.top || 0
    this.dataStore[this.top++] = element
  }
  pop() {
    return this.dataStore[--this.top]
  }
  peek() {
    return this.dataStore[this.top - 1]
  }
  clear() {
    this.top = 0
  }

  toString() {
    return String(this.dataStore)
  }

  [Symbol.iterator]() {
    let stack = this

    return {
      next() {
        return {
        //   done: stack.top === 0,
        //   value: stack.pop()
        }
      },
    }
  }
}
