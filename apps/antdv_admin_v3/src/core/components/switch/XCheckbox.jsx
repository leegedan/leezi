import { defineComponent, watch, ref } from 'vue'
import { Checkbox } from 'ant-design-vue'
import { T, omit, copy, prefix } from '../_util'

const Props = copy(omit(Checkbox.props, ['checked']), {
  on: T.any,
  off: T.any,
  value: T.any
})

const XCheckbox = defineComponent({
  name: `${prefix}Checkbox`,
  props: Props,
  emits: ['change', 'update:value'],
  setup(props, { emit }) {
    const { on, off } = props
    const ck = ref(false)

    watch(
      () => props.value,
      (val) => {
        ck.value = val === on
      },
      {
        immediate: true
      }
    )

    const onChange = (e) => {
      const checked = ck.value
      emit('update:value', checked ? off : on)
      emit('change', !checked)
    }

    return () => {
      const restProps = omit(props, ['on', 'off', 'value'])
      return <Checkbox {...restProps} checked={ck.value} onChange={onChange}></Checkbox>
    }
  }
})

/// 这个还有点用，表单场景下用switch有时候挺奇怪的，用这个就好多了。
export default XCheckbox
