import { createDictSpace } from '../../components/cache/dict'
import { isFunction } from '../../components/utils'

const space = createDictSpace('FW', 'flexible')

const _set = space.set

const cache = {}

space.set = (k, v) => {
    if (isFunction(v)) {
        cache[k] = v
    }
    return _set(k, v)
}

export function refresh(k) {
    if (cache[k]) {
        _set(k, cache[k])
    }
}

export default space
