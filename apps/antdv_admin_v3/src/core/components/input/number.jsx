import { Input } from 'ant-design-vue'
import { defineComponent, ref, watch, nextTick } from 'vue'
import { omit, T, copy, prefix, withInstall } from '../utils'

const Props = copy(Input.props, {
  value: {
    type: [String, Number]
  },
  // minus: T.bool.def(false), // 负数
  precision: T.integer.def(2), // 小数位
  /**
   * 倍数这个用来处理输入1.2 实际存120这种，江小数转整数可以辅助后台计算和数据库存储
   * 如果需要这个，最好引入高精度计算
   */
  // x: T.oneOf([1, 10, 100, 1000]).def(1), // 倍数
})

const NumberInput = defineComponent({
  name: `${prefix}inNumber`,
  props: Props,
  emits: ['update:value', 'change', 'blur'],
  setup(props, { emit, slots }) {
    // const { x, minus, precision } = props
    const { precision } = props
    const inputRef = ref()
    const text = ref('')
    // const regExp = new RegExp(`^${minus ? '-?' : ''}(([1-9]{1}\\d*)|([0]{1}))${precision > 0 ? `(\\.(\\d){0,${precision}})?` : ''}$`)
    const regExp = new RegExp(`^(([1-9]{1}\\d*)|([0]{1}))${precision > 0 ? `(\\.(\\d){0,${precision}})?` : ''}$`)

    // const tailReg = new RegExp(`\\.(0){0,${n}}?$`)

    watch(
      () => props.value,
      (val) => {
        if (val) {
          // text.value = (val / x).toString()
          text.value = val.toString()
        } else {
          if (val === 0) {
            text.value = '0'
          } else {
            text.value = ''
          }
        }
      },
      {
        immediate: true
      }
    )

    const onChange = (e) => {
      const value = e.target.value
      if (regExp.test(value)) {
        // emit('update:value', parseFloat(value) * x)
        emit('update:value', parseFloat(value))
        nextTick(() => {
          text.value = value
        })
      } else {
        if (value === '') {
          emit('update:value')
        } else {
          // 这样是比较合适的处理方式，但可能潜在未发现的小bug
          nextTick(() => {
            e.target.value = text.value
          })
        }
      }
      emit('change', e)
    }

    const onBlur = (e) => {
      const value = text.value
      if (value.slice(-1) === '.') {
        text.value = value.slice(0, -1)
      }
      emit('blur', e)
    }

    return () => {
      const restProps = omit(props, ['onUpdate:value', 'onChange', 'blur'])

      return (
        <Input
          {...restProps}
          value={text.value}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputRef}
          v-slots={slots}
        ></Input>
      )
    }
  }
})

export default withInstall(NumberInput)
