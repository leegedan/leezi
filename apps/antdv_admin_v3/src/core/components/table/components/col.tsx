import { defineComponent } from 'vue'
import { T } from '../../utils'

const Size = defineComponent({
  name: 'XTableSize',
  props: {
    cols: T.array.def([]),
    size: T.string,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const onChange = (size) => {
      emit('change', size)
    }

    const items = [
      { key: 'large', label: '宽松' },
      { key: 'middle', label: '默认' },
      { key: 'small', label: '紧凑' },
    ]
    return () => {
      const size = props.size
      const cols = props.cols
      const len = cols.length
      const selected = cols.filter(c => c.checked).length
      
      return (
        <a-dropdown placement="top" arrow>
          {{
            default: () => <a-button></a-button>,
            overlay: () => <a-menu selectedKeys={[props.size]} items={items} onSelect={onChange}></a-menu>,
          }}
        </a-dropdown>
      )
    }
  },
})

export default Size
