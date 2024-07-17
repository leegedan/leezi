import { Form, FormItem } from 'element-ui'
import { prefix, omit, copy, isNil } from '../utils'

const Props = copy(Form.props, {
  inline: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'small ',
  },

  auto: {
    type: Boolean,
    default: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  btnPosition: {
    type: String,
    default: 'tail', // tail | left/center/right
  },
})


const renderSlot = (h, ins) => {
  const slots = ins.$scopedSlots
  return Object.entries(slots).map((render) => render(ins.m))
}
const renderBtns = (h, ins) => {
  const style = {}
  if (ins.btnPosition !== 'tail') {
    style['width'] = '100%'
    style['text-align'] = ins.btnPosition
  }
  return (
    <el-form-item style={style}>
      <el-button type="primary" onClick={ins.handleSearch}>
        搜索
      </el-button>
      <el-button onClick={ins.handleReset}>重置</el-button>
    </el-form-item>
  )
}
export default {
  name: `${prefix}SearchForm`,
  props: Props,
  data() {
    return {
      m: {},
      localRules: {},
    }
  },
  created() {
    const m = {}
    const localRules = {}
    let auto = this.auto
    this.items.forEach((el) => {
      if (!isNil(el.value)) {
        m[el.key] = el.value
      }
      if (el.required) {
        localRules[el.key] = [{ required: true, trigger: 'change', message: '请输入' }]
        if (!m[el.key]) {
          auto = false
        }
      }
    })
    this.m = m
    this.localRules = localRules

    if (auto) {
      // 这个大部分时候是绑定 Table 组件使用，需要确认 search 的时候 Table已经渲染实例
      this.$nextTick(() => {
        this.handleSearch()
      })
    }
  },
  methods: {
    handleSearch() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('search', { ...this.m })
        }
      })
    },
    handleReset() {
      const m = {}
      this.items.forEach((el) => {
        if (!isNil(el.value)) {
          m[el.key] = el.value
        }
      })
      this.m = m
    },
  },

  render(h) {
    const { m, localRules, items } = this

    const props = copy(omit(this.$props, ['items', 'btnPosition']), {
      model: m,
      rules: localRules,
    })

    const formItems = items.map((item) => {
      const { key, label, comp = 'el-input', props } = item
      const Component = comp
      return (
        <FormItem label={label} prop={key} key={key}>
          <Component v-model={m[key]} {...props}></Component>
        </FormItem>
      )
    })

    const customItems = renderSlot(h, this)

    const btns = renderBtns(h, this)

    return (
      <el-form props={props} ref="form">
        {formItems}
        {customItems}
        {btns}
      </el-form>
    )
  },
}
