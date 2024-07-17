import XsModal, { xsmProps } from '../search/modal'
import { Input } from 'element-ui'
import { prefix, omit, copy, isArray } from '../../utils'

const Props = copy(Input.props, xsmProps, {
  value: {
    type: [String, Number],
    default: undefined,
  },
  textKey: {
    type: String,
    required: true,
  },
  bindKeys: {
    type: Array,
    default: () => []
  },
  model: {
    type: Object,
    default: null,
  },
  readOnly: {
    type: Boolean,
    default: true,
  },
  // open: {
  //   type: Function,
  //   default: () => {},
  // }
})

export default {
  name: `${prefix}siModal`,
  props: Props,
  data() {
    return {
      openModal: true,
      text: '',
    }
  },
  methods: {
    handleClick() {
      // this.open()
      this.openModal = true
    },
    autoBind(rows) {
      const { modal, bindKeys, conf } = this
      if (modal !== null && bindKeys.length && conf.selection === 'one') {
        const row = rows[0]
        bindKeys.forEach(key => {
          if (isArray(key)) {
            modal[key[1]] = row[key[0]]
          } else {
            modal[key] = row[key]
          }
        })
      }
    },
    handleOk(keys, rows) {
      this.text = rows.map((el) => el[this.textKey]).join(',')
      this.openModal = false
      this.autoBind(rows)
      this.$emit('input', this.text)
      this.$emit('change', this.text)
      this.$emit('bind', keys, rows)
    },
    handleCancel() {
      this.openModal = false
      this.text = undefined
    },
    handleChange() {
      this.$emit('input', this.text)
      this.$emit('change', this.text)
    },
    clear() {
      this.autoBind([{}])
      this.$emit('input')
      this.$emit('change')
      this.$emit('bind', [], [])
    },
  },
  created() {
    this.text = this.value
  },

  render() {
    const props = {}
    Object.keys(xsmProps).forEach((k) => {
      if (undefined !== this[k]) {
        props[k] = this[k]
      }
    })
    props.visible = this.openModal

    if (this.disabled === true) {
      return <a-input value={this.value} disabled></a-input>
    } else {
      const modal = <XsModal props={props} onOk={this.handleOk} onCancel={this.handleCancel}></XsModal>
      const input = this.readOnly ? (
        <Input value={this.value} readOnly placeholder="请选择">
          <el-button slot="append" icon="el-icon-search" onClick={this.handleClick}></el-button>
        </Input>
      ) : (
        <Input v-model={this.text} placeholder="请选择" onBlur={this.handleChange}>
          <el-button slot="append" icon="el-icon-search" onClick={this.handleClick}></el-button>
        </Input>
      )
      return (
        <span>
          {input}
          {modal}
        </span>
      )
    }
  },
}
