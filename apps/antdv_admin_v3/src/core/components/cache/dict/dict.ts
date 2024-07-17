import { createSpace } from '../index'
import { isPromise, isFunction } from '../../utils'

// type Space = {
//   get: (k) => any
//   set: (k, v) => void
// }
// export type DictSpace = Required<Space & { key: string }>

export const spaces = <any>[]

/**
 * 处理取值函数
 * @param {*} space
 * @param {*} key
 * @returns
 */
const getValue = (space) => {
  return (key) => {
    const data = space.get(key)
    if (isFunction(data)) {
      const result = data.call(null)
      if (isPromise(result)) {
        result.then((value) => {
          space.set(key, value)
          return value
        })
      }
      space.set(key, result)
      return result
    } else {
      return data
    }
  }
}

/**
 * `flexible` 模式可以对`space.get|set`做一些自定义操作，会影响到获取数据
 * @param namespace 
 * @param mode 
 * @returns 
 */
export function createDictSpace(namespace, mode = 'safe') {
  const space = createSpace(namespace)
  const proxy = {
    get: getValue(space),
    set: space.set,
    key: namespace,
  }
  spaces.push(proxy)
  if (mode === 'flexible') {
    return proxy
  } else {
    return { ...proxy }
  }
}
