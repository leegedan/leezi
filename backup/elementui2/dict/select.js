import { Select, Option } from 'element-ui'
import { prefix, omit, copy } from '../utils'
import { getData, getItem } from '../Cache/dict/index'

const props = copy(Select.props, {
  ns: {
    type: String,
    default: 'CONST',
  },
  dk: {
    type: String,
    required: true,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
})

const renderOptions = (h, options) => {
  return options.map((item) => <Option key={item.value} value={item.value} label={item.label}></Option>)
}
export default {
  name: `${prefix}dSelect`,
  props: props,
  data() {
    return {
      options: [],
    }
  },
  //   watch: {
  //     value: {
  //       handler(val) {
  //       },
  //       immediate: true,
  //     },
  //   },
  created() {
    const { dk, ns } = this
    getData(ns, dk).then((list) => {
      this.options = list
    })
  },
  methods: {
    handleChange(val, option) {
      this.$emit('input', val)
      this.$emit('change', val, option)
    },
    _change(val) {
      const option = getItem(this.options, val)
      this.handleChange(option.value, { ...option })
    },
    _clear() {
      this.handleChange(undefined, {})
    },
  },
  render() {
    // const props = this.$props
    const props = omit(this.$props, ['ns', 'dk'])

    const listeners = {
      ...omit(this.$listeners, ['change', 'clear', 'input']),
      clear: this._clear,
      change: this._change,
    }

    return (
      <Select props={props} on={listeners}>
        {renderOptions(h, this.options)}
        {Object.keys(this.$slots).map((name) => (
          <template slot={name}>{this.$slots[name]}</template>
        ))}
      </Select>
    )
  },
}
