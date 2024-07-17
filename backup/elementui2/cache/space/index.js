import storage, { createSpace } from '../index'

export const spaces = []

export function createNewSpace(namespace) {
  const space = createSpace(storage, namespace)
  const proxy = {
    get: space.get,
    set: space.set,
    key: namespace,
  }
  spaces.push(proxy)
  return { ...proxy }
}
