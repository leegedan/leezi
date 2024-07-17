

export default function createStorage() {
  const o = Object.create(null)

  return {
    value: o,
    get: (k) => o[k],
    set: (k, v) => (o[k] = v),
  }
}
