import { computed, defineComponent, ref, toRaw, watch } from 'vue'
import SearchModal, { xsmProps } from './search'
import { Input, InputGroup, Button } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { omit, T, copy, prefix, isArray, pick } from '../utils/index'

const props = copy(Input.props, xsmProps(), {
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
    default: () => [],
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

const IxsModal = defineComponent({
  props: props,
  inheritAttrs: false,
  emits: ['change', 'update:value'],
  setup(props, { attrs, emit }) {
    const { textKey, bindKeys, conf, readOnly } = props
    const visible = ref(false)
    const text = ref('')

    const onOpenModal = () => {
      // const show = props.allow?.() === true
      visible.value = true
    }

    const autoBind = (rows) => {
      const model = props.model
      if (model !== null && bindKeys.length && conf.selection === 'one') {
        const row = rows[0]
        bindKeys.forEach((key) => {
          if (isArray(key)) {
            model[key[1]] = row[key[0]]
          } else {
            model[key] = row[key]
          }
        })
      }
    }

    watch(
      () => props.value,
      (val) => {
        text.value = val
      },
      {
        immediate: true,
      }
    )

    const onOk = (rows) => {
      if (rows) {
        text.value = rows.map((el) => el[textKey]).join(',')
        autoBind(rows)
        emit('update:value', text.value)
        emit('change', text.value, rows)
      }
      visible.value = false
    }

    const onCancel = () => {
      visible.value = false
    }

    const onClear = () => {
      onOk([])
    }

    const onInputText = (txt) => {
      if (readOnly) {
        if (txt === '') {
          onClear()
        }
      } else {
        emit('update:value', txt)
      }
    }

    return () => {
      if (props.disabled) {
        return <a-input value={text.value} disabled></a-input>
      } else {
        const input = (
          <a-input-group compact class="x-input-modal-wrap">
            <a-input
              value={text.value}
              readOnly={readOnly}
              allowClear={readOnly}
              placeholder="请选择"
              {...attrs}
              onUpdate:value={onInputText}
            ></a-input>
            <a-button onClick={onOpenModal} v-slots={{ icon: () => <SearchOutlined /> }}></a-button>
          </a-input-group>
        )

        const searchModalProps = pick(props, ['conf', 'data', 'params'])

        const modal = (
          <SearchModal {...searchModalProps} open={visible.value} onOk={onOk} onCancel={onCancel}></SearchModal>
        )
        return (
          <>
            {input}
            {modal}
          </>
        )
      }
    }
  },
})

export default IxsModal
