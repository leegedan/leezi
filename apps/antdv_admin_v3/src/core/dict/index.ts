import { createDictSpace, useData } from '../components/cache/dict'
import { useZdSpace } from './service'
import { useFwSpace } from '../services/provide'
import { useConstSpace } from './static'

function useDict() {
  useConstSpace()
  useZdSpace()
  useFwSpace()
}

export {
  useDict,
  useData,
  createDictSpace
}