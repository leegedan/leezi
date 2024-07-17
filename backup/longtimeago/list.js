class List {
  constructor() {
    this.dataStore = []
    this.pos = 0
    this._listSize = 0
  }
  get length() {
    return this._listSize
  }
  find(element) {
    for (let i = 0; i < this.dataStore.length; i++) {
      if (element === this.dataStore[i]) {
        return i
      }
    }
    return -1
  }
  contains(element) {
    let foundAt = this.find(element)
    return foundAt !== -1
    // return Boolean(++foundAt)
  }

  append(element) {
    this.dataStore[this._listSize++] = element
    return this
  }
  insert(element, after) {
    let insertPos = this.find(after)
    if (insertPos !== -1) {
      this.dataStore.splice(insertPos + 1, 0, element)
      ++this._listSize
      return true
    }
    return false
  }
  remove(element) {
    let foundAt = this.find(element)
    if (foundAt !== -1) {
      this.dataStore.splice(foundAt, 1)
      --this._listSize
      return true
    }
    return false
  }
  clear() {
    this.dataStore = []
    this._listSize = this.pos = 0
  }

  front() {
    this.pos = 0
  }
  end() {
    this.pos = this._listSize - 1
  }
  prev() {
    if (this.pos > 0) {
      --this.pos
    }
  }
  next() {
    if (this.pos < this._listSize - 1) {
      ++this.pos
    }
  }
  currentPos() {
    return this.pos
  }
  moveTo(position) {
    this.pos = position
  }
  getElement() {
    return this.dataStore[this.pos]
  }

  toString() {
    return String(this.dataStore)
  }

  [Symbol.iterator]() {
    let list = this
    let pos = -1
    let len = list.dataStore.length

    return {
      next() {
        pos++
        return {
          value: list.dataStore[pos],
          done: pos === len,
        }
      },
    }
  }
}
