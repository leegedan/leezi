class Memory<K = String | Symbol, V = any> {
  private store: Map<K, V>
  constructor() {
    this.store = new Map<K, V>()
  }

  get = (key: K) => {
    return this.store.get(key)
  }

  set = (key: K, value: V) => {
    this.store.set(key, value)
  }

  has = (key: K) => {
    return this.store.has(key)
  }

  delete = (key: K) => {
    return this.store.delete(key)
  }

  clear = () => {
    return this.store.clear()
  }
}

const useMemo = () => new Memory()

export {
  Memory,
  useMemo
}
