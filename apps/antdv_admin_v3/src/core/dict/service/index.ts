import { find as fetchDict } from '@/api/base/dict'
import { createDictSpace } from '../../components/cache/dict'

const modules = import.meta.glob('./data/*.ts', { eager: true })
const map = Object.entries(modules).reduce((mod, next) => { return Object.assign(next, mod) }, {})

function getDict(key) {
    return fetchDict({ key }).then(res => {
        return res.data.map(item => {
            return {
                ...item,
                label: item.value,
                value: item.id
            }
        })
    })
}

// 后台数据字典
const zdSpace = createDictSpace('ZD', 'flexible')

export function useZdSpace() {
    const _set = zdSpace.set
    const _get = zdSpace.get

    zdSpace.set = () => { }
    zdSpace.get = (key) => {
        const data = _get(key)
        if (data) {
            return data
        } else {
            if (map[key]) {
                return getDict(map[key])
                    .then(list => {
                        _set(key, list)
                        return list
                    }).catch(e => {
                        // 
                        return []
                    })
            } else {
                console.error(`ZdSpace未配置[${key}]`)
            }

        }
    }
    return zdSpace
}


export default zdSpace


