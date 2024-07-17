import { Dialog } from 'element-ui'
import SearchForm from '../../Form/SearchForm'
import XTable from '../../Table/index'
import { prefix, omit, copy, isNil } from '../../utils'

export const xsmProps = {
  // 固定的参数
  conf: {
    type: Object,
    default: () => ({}),
  },
  data: {
    type: Function,
    required: true,
  },
  params: {
    type: Object,
    default: () => ({}),
  },
  visible: {
    type: Boolean,
    default: false,
  },
}

const Props = copy(xsmProps)

export default {
  name: `${prefix}sModal`,
  props: Props,

  data() {
    return {
      auto: true,
      clear: false,
      selectedRowKeys: [],
      selectedRows: [],
      filters: {},
      config: {},
    }
  },
  created() {
    this.config = Object.assign(
      {
        title: '',
        width: '640px',
        // destroyOnClose: false,
        // top: '15vh',

        formItems: [],
        hiddenLabel: false,

        rowKey: 'id',
        columns: [],
        // selectKey: undefined,
        autoLoad: true,
        pageSize: 5,
        selection: true,
        size: 'small',
        // bordered: true,
        // scroll: { y: 320 },
        // pageNum: 1,
      },
      this.conf
    )
  },
  mounted() {},
  methods: {
    handleSearch(params) {
      this.filters = params
      this.$refs.table.refresh(true)
    },
    load(params) {
      const data = { ...params, ...this.params, ...this.filters }
      return this.data(data)
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleOk() {
      this.$emit('ok', this.selectedRowKeys, this.selectedRows)
    },
    handleCancel() {
      this.$emit('cancel')
    },

    getTableProps() {
      const { rowKey, rowNo, size, columns, selection } = this.config
      return {
        size,
        rowNo: false,
        rowKey,
        columns,
        selection,
        autoload: false,
        data: this.load,
        tbCtrl: false,
        selectionAlert: true,
      }
    },
    getModalProps() {
      const { title, width, destroyOnClose, top, customClass } = this.config

      return {
        top,
        title,
        width,
        customClass,
        destroyOnClose,
      }
    },
    getSearchFormProps() {
      const { size, hiddenLabel, formItems } = this.config

      return {
        size,
        hiddenLabel,
        items: formItems,
      }
    },
  },
  render(h) {
    const ModalProps = this.getModalProps()
    /**
     * Dialog组件 visible 居然不是prop, 是attr。
     */
    ModalProps.visible = this.visible

    const SearchFormProps = this.getSearchFormProps()

    const TableProps = this.getTableProps()

    // const w = parseInt(this.width) || 520

    const form = <SearchForm class={`x-modal-search-form`} props={SearchFormProps} onSearch={this.handleSearch} />

    const table = (
      <XTable
        class="x-modal-search-table"
        ref="table"
        props={TableProps}
        onSelect={this.onSelectChange}
        scopedSlots={{ ...this.$scopedSlots }}
      ></XTable>
    )

    return (
      <Dialog props={ModalProps} onClose={this.handleCancel} class="x-modal-search">
        {form}
        {table}
        <div slot="footer" class="x-modal-search-footer" style={{ textAlign: 'right' }}>
          <el-button onClick={this.handleCancel}>取 消</el-button>
          <el-button type="primary" onClick={this.handleOk}>
            确 定
          </el-button>
        </div>
      </Dialog>
    )
  },
}
