import { spaces, createDictSpace } from './dict'
import constSpace from './const'

export function getSpaces() {
  return spaces.map((el) => el.key)
}

function _getSpace(key) {
  const space = spaces.find((el) => key === el.key)
  if (space) {
    return space
  } else {
    // console.error('space not exist!')
    throw new Error('space not exist!')
  }
}

export const getSpace = (key) => ({ ..._getSpace(key) })

export function getData(ns, key): Promise<Array<any>> {
  const space = _getSpace(ns)
  if (space) {
    const value = space.get(key)
    return Promise.resolve(value || [])
  }
  return Promise.resolve([])
}

export function getItem(list = <any>[], value) {
  return list.find((el) => el.value === value) || {}
}

export function findItem(ns, key, value) {
  const ret = getData(ns, key)
  return ret.then((list) => {
    return getItem(list, value)
  })
}

export function useData(space, dataset: Record<string, any>) {
  Object.keys(dataset).forEach((key) => {
    space.set(key, dataset[key])
  })
}

export { createDictSpace, constSpace }
