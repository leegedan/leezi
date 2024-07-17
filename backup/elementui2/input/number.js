import { Input } from "element-ui";
import { prefix, omit, copy } from "../utils";

const componentName = `${prefix}InNumber`;

const Props = copy({}, Input.props, {
  value: {
    type: [String, Number],
  },
  precision: {
    type: Number,
    default: 0,
  },
});


export default {
  name: componentName,

  props: Props,
  data() {
    return {
      text: '',
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.text = (val).toString()
        } else {
          if (val === 0) {
            this.text = '0'
          } else {
            this.text = ''
          }
        }
      },
      immediate: true,
    },
  },
  created() {
    const n = this.precision || 2
    this.regExp = new RegExp(`^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,${n}})?$`)
  },
  methods: {
    handleChange(chars) {
      if (this.regExp.test(chars)) {
        this.text = chars
      } else {
        if (chars === '') {
          this.text = ''
        } else {
          // 这里看源组件如何处理绑定值
          // this.$nextTick(() => {
          //   // this.$forceUpdate();
          // })
        }
      }
      this.$emit('change', chars)
    },
    handleBlur(e) {
      const val = parseFloat(this.text)
      if (this.value === val) {
        this.text = (val).toString()
      } else {
        this.$emit('input', val)
      }
      this.$emit('blur', e)
    }
  },

  render() {
    const props = omit(this.$props, ['value', 'precision'])
    props.value = this.text
    const listeners = {
      ...omit(this.$listeners, ['change', 'input', 'blur']),
      'input': this.handleChange,
      'blur': this.handleBlur
    }
    return (
      <Input props={props} ref="input" on={listeners}>
        {Object.keys(this.$slots).map((name) => (
          <template slot={name}>{this.$slots[name]}</template>
        ))}
      </Input>
    )
  },
}
