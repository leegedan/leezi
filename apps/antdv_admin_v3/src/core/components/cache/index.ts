import storage, { createSpace } from './space'

/**
 * 挂载到App root 对象。
 * @param {*} host
 */
function use(host) {
  host['__cache__'] = storage
  // Object.defineProperty(host, '__cache__', {
  //     value: storage
  // })
}

export {
  use,
  createSpace
}

export default {
  get: storage.get,
  set: storage.set
}
