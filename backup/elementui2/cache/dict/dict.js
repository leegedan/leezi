import storage, { createSpace } from '../index'
import { isPromise } from '../../utils'

/**
 *
 */
export const spaces = []

/**
 * 处理取值函数
 * @param {*} space
 * @param {*} key
 * @returns
 */
const getValue = (space) => {
  return (key) => {
    const data = space.get(key)
    if (typeof data === 'function') {
      const result = data.call(null)
      if (isPromise(result)) {
        result.then((value) => {
          space.set(key, value)
          return value
        })
      }
      space.set(key, result)
      return result
    }
    return data
  }
}

export function createDictSpace(namespace) {
  const space = createSpace(storage, namespace)
  const proxy = {
    get: getValue(space),
    set: space.set,
    key: namespace,
  }
  spaces.push(proxy)
  return { ...proxy }
}
