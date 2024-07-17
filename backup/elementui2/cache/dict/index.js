import { spaces, createDictSpace } from "./dict"
import ConstSpace from './sync'


const getSpaces = () => spaces.map((el) => el.key)

function useSpace(key) {
  const space = spaces.find((el) => key === el.key)
  if (space) {
    return { ...space }
  } else {
    console.error('space not exist!')
    // throw new Error('space not exist!')
  }
}

function getData(ns, key) {
  const space = useSpace(ns)
  if (space) {
    const value = space.get(key)
    return Promise.resolve(value || [])
  }
  return Promise.resolve([])
}

function getItem(list = [], value) {
  return list.find((el) => el.value === value) || {}
}

function findItem(ns, key, value) {
  const ret = getData(ns, key)
  return ret.then((list) => {
    return getItem(list, value)
  })
}

function useData(space, dataset) {
  Object.keys(dataset).forEach((key) => {
    space.set(key, dataset[key])
  })
}

export {
  createDictSpace,
  getSpaces,
  useSpace,
  getData,
  getItem,
  findItem,
  useData,
  ConstSpace
}

