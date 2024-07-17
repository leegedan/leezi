// import _ from 'underscore'
import { prefix } from './const'
import omit from './omit'
import pick from './pick'
import { connect } from './hoc'

const copy = (...args) => Object.assign({}, ...args)

const isPromise = (o) => o && o.then && typeof o.then === 'function'

const isNil = (o) => o === undefined || o === null

// const findItem = (items, value) => items.find(item => item.value === value) || { label: '' }

export { prefix, copy, omit, pick, connect, isPromise, isNil }
