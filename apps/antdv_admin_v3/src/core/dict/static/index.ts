import { constSpace, useData } from '../../components/cache/dict'

const modules = import.meta.glob('./data/*.ts', { eager: true })

export function useConstSpace() {
    const dataSet = Object.entries(modules).reduce((acc, next) => { return Object.assign(next, acc) }, {})
    useData(constSpace, dataSet)
}
