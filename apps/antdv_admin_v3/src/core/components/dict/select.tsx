import { defineComponent, shallowRef } from 'vue'
import { Select } from 'ant-design-vue'
import { T, omit, copy, isArray, prefix, withInstall } from '../utils'
import { getData, getItem } from '../cache/dict/index'

/// 字典选择应该只适用于少量数据选择
const props = copy(Select.props, {
  dk: T.string.isRequired,
  ns: T.string.def('CONST'),
  allowClear: T.bool.def(true),
})

const DSelect = defineComponent({
  name: `${prefix}dSelect`,
  props: props,
  emits: ['change', 'update:value'],
  setup(props, { emit, slots }) {
    const options = shallowRef<Array<any>>([])
    const { dk, ns, placeholder = '请选择' } = props

    getData(ns, dk).then((list) => {
      options.value = list
    })

    const input = (value, option) => {
      emit('update:value', value)
      emit('change', value, option)
    }

    const onChange = (value) => {
      const items = options.value
      if (isArray(value)) {
        const list = value.map((val) => {
          const item = getItem(items, val)
          return { ...item }
        })
        input(value, list)
      } else {
        const item = getItem(items, value)
        input(value, { ...item })
      }
    }

    return () => {
      const restProps = omit(props, ['dk', 'ns', 'onChange', 'onUpdate:value'])
      return (
        <a-select
          {...restProps}
          options={options.value}
          placeholder={placeholder}
          onChange={onChange}
          v-slots={slots}
        ></a-select>
      )
    }
  },
})

export default withInstall(DSelect)
