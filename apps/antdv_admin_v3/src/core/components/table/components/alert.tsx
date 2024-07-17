import { defineComponent } from 'vue'
import { T } from '../../utils'

const Alert = defineComponent({
  name: 'XTableSelectionAlert',
  props: {
    n: T.integer.def(0),
  },
  emits: ['cancel'],
  setup(props, { emit }) {
    const onCancel = () => {
      emit('cancel')
    }
    return () => {
      return (
        <span class="xtbs-alert">
          <span>已选择 {props.n} 项，</span>
          <el-button type="text" onClick={onCancel}>
            取消已选项
          </el-button>
        </span>
      )
    }
  },
})

export default Alert
