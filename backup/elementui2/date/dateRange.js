import { DatePicker, Message } from 'element-ui'
import { prefix, omit, copy } from '../utils'
import moment from '../utils/moment'

const componentName = `${prefix}DateRange`
const Props = copy(DatePicker.props, {
  type: {
    type: String,
    default: 'daterange',
  },
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  startPlaceholder: {
    type: String,
    default: '开始日期',
  },
  endPlaceholder: {
    type: String,
    default: '结束日期',
  },

  // props +
  begin: {
    type: String,
  },
  end: {
    type: String,
  },
  limit: {
    type: Number,
    default: 0,
  },
  value: {
    type: String,
  },
})

export default {
  name: componentName,
  props: Props,

  data() {
    return {
      range: [],
    }
  },
  computed: {
    sync() {
      if (this.begin && this.end) {
        return [new Date(this.begin), new Date(this.end)]
      } else {
        return []
      }
    },
  },
  watch: {
    sync: {
      handler(val) {
        this.range = val
      },
      immediate: true,
    },
  },
  methods: {
    clear() {
      this.$emit('update:begin')
      this.$emit('update:end')
      this.$emit('change', [])
    },
    handleChange(val) {
      if (this.limit) {
        const d = this.days >>> 0
        const days = moment(val[1]).diff(moment(val[0]), 'days')
        if (days > d) {
          this.clear()
          Message.warning(`选择范围不能超过${d}天`)
          return
        }
      }
      if (val && val[0] && val[1]) {
        const begin = moment(val[0]).format(this.valueFormat)
        const end = moment(val[1]).format(this.valueFormat)
        this.$emit('update:begin', begin)
        this.$emit('update:end', end)
        this.$emit('change', [begin, end])
      } else {
        this.clear()
      }
    },
  },
  render() {
    const props = omit(this.$props, ['begin', 'end', 'limit', 'valueFormat'])
    props.value = this.range
    const listeners = {
      ...omit(this.$listeners, ['input', 'change']),
      input: this.handleChange,
    }

    return (
      <DatePicker props={props} on={listeners}>
        {/* { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) } */}
      </DatePicker>
    )
  },
}
