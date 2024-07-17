import { ref, defineComponent, watch } from 'vue'
import { RangePicker, message } from 'ant-design-vue'
import { T, copy, omit, prefix, withInstall } from '../utils'
import datex from '../utils/date'

const props = copy(RangePicker.props, {
  begin: T.string,
  end: T.string,
  valueFormat: T.string.def('YYYY-MM-DD'),
  limit: T.integer.def(0),
})

const DateRange = defineComponent({
  name: `${prefix}dRange`,
  props: props,
  emits: ['change', 'update:begin', 'update:end'],
  setup(props, { slots, emit }) {
    const { limit } = props

    const range = ref<[string, string]>()

    watch(
      () => [props.begin, props.end],
      ([d1, d2]) => {
        if (d1 && d2) {
          range.value = [d1, d2]
        } else {
          range.value = undefined
        }
      },
      {
        immediate: true,
      },
    )

    const input = (range) => {
      emit('update:begin', range[0])
      emit('update:end', range[1])
      emit('change', range)
    }

    const onChange = (range) => {
      if (range && range[0] && range[1]) {
        if (limit > 0) {
          const diff = datex(range[1]).diff(datex(range[0]), 'D')
          if (diff > limit) {
            input([])
            message.warning(`选择范围不能超过${limit}天`)
            return
          }
        }
        input(range)
      } else {
        input([])
      }
    }

    return () => {
      const restProps = omit(props, ['limit', 'value', 'begin', 'end', 'onChange', 'onUpdate:value'])

      return <RangePicker {...restProps} value={range.value} onChange={onChange} v-slots={slots}></RangePicker>
    }
  },
})

export default withInstall(DateRange)
