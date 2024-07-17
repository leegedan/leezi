import { prefix, isNil } from '../utils'
import { findItem } from '../Cache/dict/index'

export default {
  name: `${prefix}dSpan`,
  props: {
    value: {
      type: [String, Boolean, Number],
    },
    ns: {
      type: String,
      default: 'CONST',
    },
    dk: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: '',
    }
  },
  watch: {
    value: {
      handler(val) {
        this.setText()
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    setText() {
      const { value, ns, dk } = this
      if (isNil(value)) {
        this.text = ''
      } else {
        findItem(ns, dk, value).then((item) => {
          this.text = item.label || ''
        })
      }
    },
  },

  render() {
    return <span>{this.text}</span>
  },
}
