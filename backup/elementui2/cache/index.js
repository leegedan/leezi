import createStorage from './storage'

const storage = createStorage()

export function createSpace(store, namespace) {
  if (store.get(namespace)) {
    throw new Error('此名称模块已存在')
  }
  const space = createStorage()
  store.set(namespace, space.value)
  return {
    get: space.get,
    set: space.set,
  }
}

/// use hook mount
export function use(host) {
  host['__cache__'] = storage.value
//   Object.defineProperty(host, '__cache__', {
//     value: storage.value,
//   })
}

export default {
  get: storage.get,
  set: storage.set,
}
