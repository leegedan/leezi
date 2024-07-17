import { Table, TableColumn } from 'element-ui'
import Pagination from '../Pagination/index'
import { isPromise, copy, omit, prefix } from '../utils'
import { getSlot, getProp } from '../utils/vutil'
import genRender from './render/fmt'

import SelectionTip from './components/alert'
import ColsCtrl from './components/cols'
import SizeCtrl from './components/size'

const renderColumn = (h, props) => {
  const render = props.render
  const key = props.prop
  const scopedSlots = {}

  if (props.renderHeader) {
    scopedSlots['header'] = props.renderHeader
  }
  if (render) {
    if (render.type) {
      // fmt
      const _render = genRender(h, render)
      scopedSlots['default'] = ({ row, column, $index }) => _render(row[column['property']], row, $index)
    } else if (typeof render === 'function') {
      // custom
      scopedSlots['default'] = render
    }
  }

  props.minWidth = props.minWidth || '120px'

  return <TableColumn {...{ props, scopedSlots }} key={key}></TableColumn>
}

// const getColVnodeKey = (vnode) => {
//   const props = vnode.componentOptions.propsData || {}
//   return props['prop']
// }

// const renderColumns = (h, ins) => {
//   const cols = getProp(ins, 'columns')

//   const _child = getSlot(ins) || []
//   const _temp = {}
//   let _keys = _child.map((vn) => {
//     const k = getColVnodeKey(vn)
//     _temp[k] = vn
//     return k
//   })

//   const vnodes = cols.map((el) => {
//     const i = _keys.indexOf(el.prop)
//     if (i === -1) {
//       return renderColumn(h, el)
//     } else {
//       _keys.splice(i, 1)
//       return _temp[el.prop]
//     }
//   })

//   const rest = _keys.map((k) => _temp[k])

//   return [].concat(vnodes, rest)
// }

const getVnodeProp = (vnode, prop) => {
  const props = vnode.componentOptions.propsData || {}
  return props[prop]
}

const getColumns = (h, ins) => {
  const cols = getProp(ins, 'columns')
  const colSlot = getSlot(ins) || []

  const temp = {}
  const keys = colSlot.map((vn) => {
    const k = getVnodeProp(vn, 'prop')
    temp[k] = {
      prop: k,
      label: getVnodeProp(vn, 'label'),
      vnode: vn,
    }
    return k
  })

  const list = cols.map((el) => {
    const i = keys.indexOf(el.prop)
    if (i === -1) {
      return {
        prop: el.prop,
        label: el.label,
        vnode: renderColumn(h, el),
      }
    } else {
      keys.splice(i, 1)
      return temp[el.prop]
    }
  })

  const rest = keys.map((k) => temp[k])

  const columns = [].concat(list, rest).map((el, i) => {
    if (el.prop === undefined) {
      el.prop = `tbcol${i}`
      el.vnode.key = `tbcol${i}`
    }
    return el
  })

  return columns
}

const renderMultiSelection = (h) => {
  return <el-table-column type="selection" width="55"></el-table-column>
}

const renderSingleSelection = (h, ins) => {
  const key = getProp(ins, 'rowKey')
  return (
    <el-table-column
      width="55"
      scopedSlots={{
        default: ({ row, column, $index }) => {
          return (
            <el-radio
              class="sb-ele-ratio"
              value={ins.selectedRowKey}
              label={row[key]}
              onInput={(val) => {
                ins.selectedRowKey = val
              }}
            ></el-radio>
          )
        },
      }}
    ></el-table-column>
  )
}

const renderSelectionColumn = (h, ins) => {
  const selection = getProp(ins, 'selection')
  return selection === false
    ? null
    : selection === '' || selection === true
    ? renderMultiSelection(h)
    : renderSingleSelection(h, ins)
}

const renderIndexColumn = (h, ins) => {
  const index = getProp(ins, 'rowNo')
  return index ? h('el-table-column', { props: { prop: 'rowNo', label: '序号', width: 80 } }) : null
}

const renderAppend = (h, ins) => {
  return getSlot(ins, 'append')
  // const vnode = getSlot(ins, 'append')
  // return vnode ? <template v-slot="append">{vnode}</template> : null
}

const renderSizeCtrl = (h, size, callback) => {
  return <SizeCtrl size={size} onChange={callback}></SizeCtrl>
}

const renderColsCtrl = (h, cols, size, callback) => {
  return <ColsCtrl cols={cols} size={size} onChange={callback}></ColsCtrl>
}

const renderSelectionAlert = (h, n, callback) => {
  return <SelectionTip n={n} onClear={callback}></SelectionTip>
}

const Props = copy(Table.props, {
  rowKey: {
    type: [String, Function],
    default: 'id',
  },

  data: {
    type: Function,
    required: true,
  },

  columns: {
    type: Array,
    default: () => [],
  },

  rowNo: {
    type: Boolean,
    default: false,
  },

  // false, true: 多选, one: 单选
  selection: {
    type: [String, Boolean],
    default: false,
  },
  // 多选提示
  selectionAlert: {
    type: Boolean,
    default: false,
  },
  // // 可以保留分页选中数据，坏处是选中的删除也会保留容易产生bug，非必要不要使用
  // reserveSelection: {
  //   type: Boolean,
  //   default: false,
  // },
  pageNum: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  // showSizeChanger: {
  //   type: Boolean,
  //   default: true,
  // },
  // medium / small / mini
  size: {
    type: String,
    default: 'small',
  },
  pagination: {
    type: Object,
    default: () => ({}),
  },
  showPagination: {
    type: String | Boolean,
    default: 'auto',
  },
  autoload: {
    type: Boolean,
    default: true,
  },
  tbCtrl: {
    type: Boolean,
    default: true,
  },
})

// let columnCache = []
// let columnSlotCache = []

export default {
  name: `${prefix}Table`,
  props: Props,
  data() {
    return {
      selectedRows: [],
      selectedRowKeys: [],
      selectedRowKey: 0,

      localLoading: false,
      localDataSource: [],
      localPagination: {},
      localColumns: [], //
      localSize: '',

      // 存储表格onchange时的filters， sorter对象
      filters: {},
      sorter: {},

      cols: [],
    }
  },

  watch: {
    // pageNum(val) {
    //   Object.assign(this.localPagination, {
    //     current: val,
    //   })
    // },
    // pageSize(val) {
    //   Object.assign(this.localPagination, {
    //     pageSize: val,
    //   })
    // },
    // showSizeChanger(val) {
    //   Object.assign(this.localPagination, {
    //     showSizeChanger: val,
    //   })
    // },
    // // 动态列这个问题以后再说
    // columns(cols) {
    //   if (cols && cols.length) {
    //     this.convertCols(cols)
    //   }
    // }
  },
  computed: {
    // localRowSelection() {
    // },
  },
  created() {
    this.localPagination =
      (['auto', true].includes(this.showPagination) &&
        Object.assign({}, this.pagination, {
          current: this.pageNum,
          pageSize: this.pageSize,
        })) ||
      false
    this.localSize = this.size

    this.colVnodes = getColumns(this.$createElement, this)
    this.cols = this.colVnodes.map(({ prop, label }) => {
      return {
        prop,
        label,
        checked: true,
      }
    })

    if (this.autoload) {
      this.refresh()
    }
  },
  methods: {
    setSize(size) {
      this.localSize = size
    },
    convertCols(cols) {},
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh(bool = false) {
      if (bool) {
        if (this.localPagination !== false) {
          this.localPagination = Object.assign(
            {},
            {
              current: 1,
              pageSize: this.pageSize,
            }
          )
        }
      }
      this.loadData()
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData(pagination, filters = this.filters, sorter = this.sorter) {
      this.filters = filters
      this.sorter = sorter
      this.localLoading = true
      const parameter = Object.assign(
        {
          pageNo:
            (pagination && pagination.current) || (this.showPagination && this.localPagination.current) || this.pageNum,
          pageSize:
            (pagination && pagination.pageSize) ||
            (this.showPagination && this.localPagination.pageSize) ||
            this.pageSize,
        },
        (sorter &&
          sorter.field && {
            sortField: sorter.field,
          }) ||
          {},
        (sorter &&
          sorter.order && {
            sortOrder: sorter.order,
          }) ||
          {},
        {
          ...filters,
        }
      )

      const result = this.data(parameter)
      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.total, r.data
      // eslint-disable-next-line
      if (isPromise(result)) {
        result
          .then((r) => {
            /// 填充数据
            /// r.data = r.data || []
            /// r.current = r.current || 1
            /// r.total = r.total || 0

            this.localPagination =
              (this.showPagination &&
                Object.assign({}, this.localPagination, {
                  current: r.current || (pagination && pagination.current) || 1, // 返回结果中的当前分页数
                  total: r.total || 0, // 返回结果中的总记录数
                  showSizeChanger: this.showSizeChanger,
                  pageSize: (pagination && pagination.pageSize) || this.localPagination.pageSize,
                })) ||
              false
            // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
            if (r.data.length === 0 && this.showPagination && this.localPagination.current > 1) {
              this.localPagination.current--
              this.loadData()
              return
            }

            // 这里用于判断接口是否有返回 r.totalCount 且 this.showPagination = true 且 pageNo 和 pageSize 存在 且 totalCount 小于等于 pageNo * pageSize 的大小
            // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
            try {
              if (
                ['auto', true].includes(this.showPagination) &&
                r.total <= r.current * this.localPagination.pageSize
              ) {
                this.localPagination.hideOnSinglePage = true
              }
            } catch (e) {
              this.localPagination = false
            }

            // this.localDataSource = r.data // 返回结果中的数组数据
            /// 生成序号
            if (this.rowNo) {
              r.data.forEach((row, i) => {
                row.rowNumber = (this.localPagination.current - 1) * this.localPagination.pageSize + (i + 1)
              })
            }

            this.localDataSource = r.data
            this.localLoading = false
          })
          .catch((e) => {
            this.localLoading = false
          })
      } else {
        this.localLoading = false
      }
    },
    /**
     * @param selectedRowKeys
     * @param selectedRows
     */
    updateSelect(selectedRows) {
      const rowKey = this.rowKey
      const keys = selectedRows.map((row) => row[rowKey])
      this.selectedRows = selectedRows
      this.$emit('select', keys, this.selectedRows)

      this.selectedRowKeys = keys
      this.selectedRowKey = keys[0]
    },
    /**
     * 清空 table 已选中项
     */
    clearSelected() {
      this.$refs['table'].clearSelection()
      this.updateSelect([], [])
    },

    _select(selectedRows) {
      this.updateSelect(selectedRows)
    },
    // _selectAll(selectedRows) {
    //   this.updateSelect(selectedRows)
    // },
    _rowClick(row, column, event) {
      if (this.selection === 'one') {
        this.updateSelect([row])
      }
      this.$emit('row-click', row, column, event)
    },

    renderSelectionAlert(h) {
      const n = this.selectedRows.length
      return this.selectionAlert === true && (this.selection === '' || this.selection === true) && n
        ? renderSelectionAlert(h, n, () => {
            this.clearSelected()
          })
        : null
    },

    renderExtra(h) {
      return (
        <div class="x-row">
          {this.renderSelectionAlert(h)}
          <div class="full">{getSlot(this, 'btns')}</div>
          {this.renderTableCtrl(h)}
        </div>
      )
    },
    renderTableCtrl(h) {
      const { tbCtrl, localSize, cols = [] } = this
      return tbCtrl ? (
        <div class="x-table-ctrl">
          <el-button icon="el-icon-refresh" size={localSize} circle onClick={() => this.refresh()}></el-button>
          {renderSizeCtrl(h, localSize, (size) => {
            console.log(size)
            this.localSize = size
          })}
          {renderColsCtrl(h, cols, localSize, (cols) => {
            this.cols = cols
            this.$nextTick(() => {
              this.$refs.table.doLayout()
            })
          })}
        </div>
      ) : null
    },

    renderColumns(h) {
      const map = this.cols.reduce((o, col) => {
        o[col.prop] = col.checked
        return o
      }, {})

      return this.colVnodes.map((col) => {
        return map[col.prop] ? col.vnode : null
      })
    },
  },

  render(h) {
    const props = {}
    Object.keys(Table.props).forEach((k) => {
      if (undefined !== this[k]) {
        props[k] = this[k]
      }
    })

    props.data = this.localDataSource
    props.size = this.localSize

    const pageProps = {
      ...omit(this.localPagination, ['current']),
      currentPage: this.localPagination.current,
    }

    const listeners = {
      ...omit(this.$listeners, ['row-click', 'selection-change']),
      'row-click': this._rowClick,
      // select: this._select,
      'selection-change': this._select,
    }

    const table = (
      <Table
        ref="table"
        v-loading={this.localLoading}
        class="x-table"
        {...{ props, on: listeners }}
      >
        {renderSelectionColumn(h, this)}
        {renderIndexColumn(h, this)}
        {this.renderColumns(h)}
        {renderAppend(h, this)}
      </Table>
    )
    return (
      <div>
        {this.renderExtra(h)}
        {table}
        {this.localPagination ? (
          <Pagination props={pageProps} style={{ textAlign: 'right', padding: '8px' }}></Pagination>
        ) : null}
      </div>
    )
  },
}
