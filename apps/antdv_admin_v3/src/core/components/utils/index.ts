import propTypes from 'ant-design-vue/es/_util/vue-types'
import { withInstall } from 'ant-design-vue/es/_util/type'
import { prefix } from './const'
import { connect } from './vhoc'
import Memory from '../../storage/memory'

// import { getSlotsProps, getSlot, filterEmpty, hasSlotProps } from '@v-c/utils'
import { getSlotsProps, safeNextick, useState } from '@v-c/utils'

export * from './base'

// 这大概就是写不了ts的原因吧...
function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
        const toMerge = args[i];
        for (const key in toMerge) {
            ret[key] = toMerge[key];
        }
    }
    return ret;
}

export { prefix, connect, propTypes as T, withInstall, Memory, getSlotsProps, safeNextick, useState, mergeProps }
