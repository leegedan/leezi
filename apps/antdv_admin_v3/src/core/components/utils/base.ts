import { isArray, isFunction, classNames, omit, pick } from '@v-c/utils'
const isPromise = (o) => o && o.then && typeof o.then === 'function'
const isNil = (o) => o == null
const extend = Object.assign
const copy = (...args) => extend({}, ...args)


export { copy, extend, omit, isFunction, pick, isNil, isArray, isPromise, classNames }
