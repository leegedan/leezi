import { computed, defineComponent, ref, shallowRef, toRaw, watch } from 'vue'
import { Modal } from 'ant-design-vue'
import Table from '../table/index'
import SearchForm from '../form/SearchForm'
import { omit, T, copy, prefix, withInstall } from '../utils/index'

export const xsmProps = () => ({
  conf: T.object.def({}),
  data: T.func.isRequired,
  params: T.object.def({}),
  open: T.bool.def(false),
})

const XSModal = defineComponent({
  name: `${prefix}sModal`,
  props: xsmProps(),
  emits: ['ok', 'cancel'],
  setup(props, { slots, emit }) {
    const tableRef = ref<any>(null)
    const selectedRowKeys = ref([])

    let filters = {}
    let selectedRow = null

    const loadTableData = (params) => {
      return props.data!({
        ...params,
        ...filters,
      })
    }

    const onSearch = (params) => {
      filters = {
        ...props.params,
        ...params,
      }
      tableRef.value?.refresh(true)
    }

    const onSelect = (keys, rows) => {
      selectedRowKeys.value = keys
      selectedRow = toRaw(rows[0])
    }

    const handleCancel = () => {
      emit('cancel')
    }
    const handleOk = () => {
      if (selectedRow) {
        emit('ok', selectedRow)
      } else {
        emit('cancel')
      }
    }

    const tableProps = computed(() => {
      const { rowKey, rowNo = false, size, columns, selection = 'one' } = props.conf
      return {
        size,
        rowNo,
        rowKey,
        columns,
        selection,
        autoload: false,
        data: loadTableData,
        // tbCtrl: false,
        // selectionAlert: true,
      }
    })

    const modalProps = computed(() => {
      const { destroyOnClose = true, wrapClassName = 'x-modal-search' } = props.conf
      return {
        destroyOnClose,
        wrapClassName,
      }
    })

    const formProps = computed(() => {
      const { size, hiddenLabel = false, formItems = [] } = props.conf
      return {
        size,
        hiddenLabel,
        items: formItems,
      }
    })

    const rowSelection = computed(() => {
      return {
        type: 'radio',
        selectedRowKeys: selectedRowKeys.value,
        onChange: onSelect,
      }
    })

    return () => {
      const form = <SearchForm {...formProps.value} onSearch={onSearch}></SearchForm>

      const table = (
        <Table {...tableProps.value} rowSelection={rowSelection.value} ref={tableRef} v-slots={slots}></Table>
      )

      return (
        <Modal {...modalProps} open={props.open} onCancel={handleCancel} onOk={handleOk}>
          {form}
          {table}
        </Modal>
      )
    }
  },
})

export default withInstall(XSModal)