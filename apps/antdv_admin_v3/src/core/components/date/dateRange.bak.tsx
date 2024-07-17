import { ref, defineComponent, watch } from 'vue'
import type { ExtractPropTypes } from 'vue';
import { RangePicker, message } from 'ant-design-vue'
import type { RangePickerProps } from 'ant-design-vue/es/date-picker'
import { T, copy, omit, prefix, withInstall } from "../utils";
import datex from "../utils/date";


const rangeProps = {
  begin: T.string,
  end: T.string,
  valueFormat: T.string.def('YYYY-MM-DD'),
  limit: T.integer.def(0)
}

// export type DateRangeProps = Partial<ExtractPropTypes<typeof rangeProps>> & RangePickerProps
export type DateRangeProps = Partial<ExtractPropTypes<typeof rangeProps & RangePickerProps>>

const DateRange = defineComponent({
  name: `${prefix}dRange`,
  props: copy(RangePicker.props, rangeProps),
  emits: ['change', 'update:begin', 'update:end'],
  setup(props, { slots, emit }) {
    const { limit } = props

    const range = ref([])

    watch(
      () => [props.begin, props.end],
      ([d1, d2]) => {
        if (d1 && d2) {
          range.value = [d1, d2]
        } else {
          range.value = []
        }
      },
      {
        immediate: true
      }
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
      const restProps = omit(props, [
        'limit',
        'value',
        'begin',
        'end',
        'onChange',
        'onUpdate:value'
      ])

      return (
        <RangePicker
          {...restProps}
          value={range.value}
          onChange={onChange}
          v-slots={slots}
        ></RangePicker>
      )
    }
  }
})

export default withInstall(DateRange)
