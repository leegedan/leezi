

import { Memory } from '../../utils'

const defaultStorage = new Memory()

export function createSpace(namespace, storage = defaultStorage) {
  if (storage.get(namespace)) {
    throw new Error('此名称模块已存在')
  }
  const space = new Memory()
  storage.set(namespace, space)
  return space
}

export default defaultStorage
