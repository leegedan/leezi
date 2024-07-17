import Modal from 'ant-design-vue/es/modal/Modal'
import SearchForm from '@/core/components/form/SearchForm'
import STable from '@/core/components/table/index'
import { wait } from '@/core/cool/promise'

const defaultTableProps = {
  size: 'middle',
  // bordered: true,
  // scroll: { y: 320 },
  // pageNum: 1,
  // size: 'small'
}
const defaultModalProps = {
  destroyOnClose: true,
  wrapClassName: 'modal-select-wrap',
}

export default {
  components: {
    SearchForm,
    STable,
  },
  props: Object.assign({}, Modal.props, {
    conf: {
      type: Object,
      default: () => ({
        // fields: [],
        // hiddenLabel: false,
        // columns: [],
        // rowKey: 'serialNo',
        // selectKey: undefined,
        // selectValue
        // autoLoad: true,
        // pageSize: 5,
      }),
    },
    loadData: {
      type: Function,
      required: true,
    },
    params: {
      type: Object,
      default: () => ({}),
    },
  }),
  watch: {
    params: function (val, old) {
      if (val && old) {
        this.filters = {
          ...val,
        }
      }
    },
  },
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
    this.filters = {
      ...this.params,
    }
    this.config = Object.assign(
      {
        hiddenLabel: false,
        fields: [],
        columns: [],
        rowKey: 'rowNum',
        selectKey: undefined,
        autoLoad: true,
        pageSize: 5,
      },
      this.conf
    )
  },
  mounted() {
    /// table 还没创建
    // const fields = this.config.fields
    // const check = fields.find(el => el.required)
    // if (!check) {
    //   this.handleSearch({})
    // }
  },
  methods: {
    handleSearch(params) {
      this.filters = {
        ...this.filters,
        ...params,
      }
      this.$refs.table.refresh(true)
    },
    load(params) {
      const data = { ...params, ...this.filters }
      return this.loadData(data)
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleOk() {
      const keys = this.selectedRowKeys
      const rows = this.selectedRows
      this.$emit('ok', keys, rows)
      if (this.destroyOnClose) {
        wait(300).then(() => {
          if (this.visible === false) {
            this.selectedRowKeys = []
            this.selectedRows = []
          }
        })
      }
    },
    handleCancel() {
      this.$emit('cancel')
      if (this.destroyOnClose) {
        wait(300).then(() => {
          this.selectedRowKeys = []
          this.selectedRows = []
        })
      }
    },
    getTableProps() {
      const conf = this.config
      return {
        ...defaultTableProps,
        rowKey: conf.rowKey,
        pageSize: conf.pageSize,
        columns: conf.columns,
        autoload: false,
        data: this.load,
        checkbox: true,
      }
    },
    clearSelected() {
      this.$refs.table.clearSelected()
    },
  },
  render() {
    const conf = this.config
    const TableProps = this.getTableProps()

    const w = parseInt(this.width) || 520
    const SearchFormProps = {
      fields: conf.fields,
      hiddenLabel: conf.hiddenLabel,
      // size: 'small'
    }
    const ModalProps = { ...defaultModalProps }
    Object.keys(Modal.props).forEach((k) => {
      if (undefined !== this[k]) {
        ModalProps[k] = this[k]
      }
    })

    const form = (
      <search-form class={`form-${w > 680 ? '3' : '2'}col-wrap`} props={SearchFormProps} onSearch={this.handleSearch} />
    )

    const table = (
      <x-table
        class="modal-select-table"
        ref="table"
        props={TableProps}
        scopedSlots={{ ...this.$scopedSlots }}
        onSelect={this.onSelectChange}
      ></x-table>
    )

    const len = this.selectedRowKeys.length
    const alert = (
      <div class="x-row tbs">
        <div class="full">
          <span>已选中：</span>
          <span class="red">{len}项</span>
          {len ? <a onClick={this.clearSelected}>清空选中</a> : null}
        </div>
      </div>
    )

    return (
      <a-modal props={ModalProps} onCancel={this.handleCancel} onOk={this.handleOk}>
        {form}
        {alert}
        {table}
      </a-modal>
    )
  },
}
