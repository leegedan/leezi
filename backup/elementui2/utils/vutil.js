
// 获取 插槽位置 允许使用 slot 或者 prop 两种方式注入。
export const getChild = (ins, prop) => {
  return getScopedSlot(ins, prop) || getSlot(ins, prop) || getProp(ins, prop)
}

// 获取 插槽位置 允许使用 slot 或者 prop 两种方式注入。
export const getFcChild = (ins, prop) => {
  return getFcScopedSlot(ins, prop) || getFcSlot(ins, prop) || getFcProp(ins, prop)
}

export const getProp = (ins, key) => {
  return ins.$props[key]
}

export const getFcProp = (ins, key) => {
  return ins.props[key]
}

export const getSlot = (instance, name = 'default') => {
  // this
  return instance.$slots[name]
}

export const getScopedSlot = (instance, name = 'default') => {
  // this
  return instance.$scopedSlots[name]
}

export const getFcSlot = (instance, name = 'default') => {
  // render(h, content)
  // functional 用 content 获取
  const slots = instance.slots()
  return slots[name]
}

export const getFcScopedSlot = (instance, name = 'default') => {
  // render(h, content)
  // functional 用 content 获取
  const slots = instance.scopedSlots
  return slots[name]
}
