import { createDictSpace } from '../../dict'
import { isFunction } from '../../components/utils'

export function createInnerSpace() {
    const space = createDictSpace('FW', 'flexible') as any
    const cache = {}
    const _set = space.set
    const _get = space.get

    space.set = (k, v) => {
        if (isFunction(v)) {
            cache[k] = v
        }
        return _set(k, v)
    }

    space.get = (k) => {
        return Promise.resolve(_get(k))
    }

    space.refresh = (k) => {
        if (cache[k]) {
            _set(k, cache[k])
        }
    }
    return space
}
