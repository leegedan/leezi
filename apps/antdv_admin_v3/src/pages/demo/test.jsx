

import { h } from 'vue'
import {  } from 'ant-design-vue'

const C1 = (props, ctx) => {
    return h(`h${props.level}`, ctx.attrs, ctx.slots)
}
C1.props = ['level']

const C2 = (props, ctx) => {
    return <p {...props} >
      {ctx.slots.default?.call() }
      {ctx.slots.ttt?.call(null, 'ttxx') }
    </p>
}

const C3 = (props, ctx) => {
    console.log(props)
    const slot = ctx.slots['default']
    const child = slot ? slot.call(ctx.slots) : void 0
    return child
}

export {
    C1,
    C2,
    C3
}