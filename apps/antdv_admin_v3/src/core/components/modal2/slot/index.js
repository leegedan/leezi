import XsModal, { xsmProps } from '../search/modal'
import { prefix, omit, copy, isNil } from '../../utils'

const Props = copy(xsmProps, {  })

export default {
    name: `${prefix}ssModal`,
  props: Props,
  data() {
    return {
    }
  },
  methods: {
    handleOk(keys, rows) {
      if (rows.length) {
        this.$emit('ok', rows)
      } else {
        this.handleCancel()
      }
    },
    handleCancel() {
      this.$emit('update:visible', false)
      this.$emit('cancel')
    }
  },
  created() {
  },
  render() {
    const props = {}
    Object.keys(XsModal.props).forEach(k => {
      if (undefined !== this[k]) {
        props[k] = this[k]
      }
    })

    const modal = (
      <XsModal
        ref="modal"
        props={props}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        scopedSlots={{ ...this.$scopedSlots }}
      ></XsModal>
    )

    return (
      <span>
        {this.$slots.default}
        {modal}
      </span>
    )
  }
}
