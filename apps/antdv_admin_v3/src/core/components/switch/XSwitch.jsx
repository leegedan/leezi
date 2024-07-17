import { defineComponent, watch, ref } from 'vue'
import { Switch } from 'ant-design-vue'
import { T, omit, copy, prefix } from '../_util'

const Props = copy(Switch.props, {
  on: T.any.def('Y'),
  off: T.any.def('N'),
  value: T.any
})

const XSwitch = defineComponent({
  name: `${prefix}Switch`,
  props: Props,
  emits: ['update:value', 'change'],
  setup(props, { emit, slots }) {
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

    const onChange = (checked) => {
      emit('update:value', checked ? on : off)
      emit('change', checked)
    }

    return () => {
      const restProps = omit(props, ['on', 'off', 'value', 'onChange'])

      return <Switch {...restProps} checked={ck.value} onChange={onChange}></Switch>
    }
  }
})

/// 这个没什么用了 Switch 添加了checkedValue/unCheckedChildren
export default XSwitch
