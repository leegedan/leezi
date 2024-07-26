import { constSpace, useData } from '../../components/cache/dict'

const modules = import.meta.glob('./data/*.ts', { eager: true })

export function useConstSpace() {
    const dataSet = Object.values(modules).reduce((acc, next) => { return Object.assign(acc, next['default']) }, {})
    useData(constSpace, dataSet)
}
