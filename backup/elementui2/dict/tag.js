import { prefix, isNil } from '../utils'
import { Tag } from 'element-ui'
import { findItem } from '../Cache/dict/index'

const tagProps = {
  type: undefined, // success/info/warning/danger
  size: 'mini',
  effect: 'plain', // dark / light / plain
}

export default {
  // name: `${prefix}DictTag`,
  name: `${prefix}dTag`,
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
    // value-type 映射
    // valueTypes: {
    //     type: Object,
    //     default: () => ({
    //         // '0': 'success',
    
    //         // '1': 'info'
    //     })
    // }
  },
  data() {
    return {
      text: '',
      // tagProps: {}
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
          // this.color = item.color
        })
      }
    },
  },

  render() {
    return <Tag props={tagProps}>{this.text}</Tag>
  },
}
