import { createSpace } from './index'

export const spaces = <any>[]

export function createNewSpace(namespace) {
    const space = createSpace(namespace)
    spaces.push(space)
    return space
}
