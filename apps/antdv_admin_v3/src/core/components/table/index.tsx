import { h, reactive, computed, defineComponent, onBeforeMount } from 'vue'
import { Table } from 'ant-design-vue'
import genRender from './render/fmt'
import { T, prefix, omit, copy, classNames, isPromise, withInstall } from '../utils'

const Props = copy(Table.props, {
  rowKey: T.string.def('id'),
  rowNo: T.bool.def(false),
  load: T.func.isRequired,
  pageNum: T.number.def(1),
  pageSize: T.number.def(10),
  // showPagination: T.oneOf([false, true, 'auto']).def(true)
  showPagination: T.bool.def(true),
  autoload: T.bool.def(true),
  selection: T.oneOf([false, true, 'one']).def(false),
  selectionAlert: T.bool.def(false),
  size: T.string.def('middle'),

  tbCtrl: T.bool.def(false),

  scroll: {
    type: Object,
    default: () => ({ x: true }),
  },
  // rowSelection: {
  //   type: Object,
  //   default: null,
  // },
})
const XTable = defineComponent({
  name: `${prefix}Table`,
  inheritAttrs: false,
  props: Props,
  emit: ['select', 'expand'],
  setup(props, { slots, emit, expose, attrs }) {
    const { load, autoload, pageNum, pageSize, showPagination, rowNo, rowKey } = props

    /// #mark 可以做点优化
    const state = reactive({
      selectedRowKeys: [],
      loading: false,
      dataSource: [],
      pagination: showPagination
        ? copy(props.pagination, {
            current: pageNum,
            pageSize: pageSize,
          })
        : false,
    })

    // let cacheRows = [];
    // let filters = {}
    // let sorter = {}

    const rowSelection = computed(() => {
      if (props.selection) {
        return {
          ...props.rowSelection,
          type: props.selection === 'one' ? 'radio' : 'checkbox',
          /// #mark preserveSelectedRowKeys 可以解决分页数据问题。 有个隐患，删除操作需要同步下key
          // preserveSelectedRowKeys: true,
          selectedRowKeys: state.selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            updateSelect(selectedRowKeys, selectedRows)
          },
        }
      } else {
        return null
      }
    })

    const customRow = computed(() => {
      const fn = props.customRow
      if (props.selection === 'one') {
        return (record, index) => {
          const result = fn?.call(null, record, index)
          return {
            ...result,
            onClick: (e) => {
              updateSelect([record[rowKey]], [record])
              result?.onClick?.call(null, e)
            },
          }
        }
      } else {
        return fn
      }
    })

    const columns = computed(() => {
      const cols = props.columns.map((col) => {
        if (col.render && col.render.type) {
          col.customRender = genRender(h, col.render)
        }
        return col
      })

      if (rowNo) {
        cols.unshift({
          dataIndex: 'rowNumber',
          title: '序号',
          width: 55,
          customCell: (x) => ({
            style: { padding: 0, textAlign: 'center' },
          }),
        })
      }
      return cols
    })

    const wrapCls = computed(() => {
      const scrollX = props.scroll.x
      if (scrollX === true || scrollX === 'max-content' || scrollX === undefined) {
        return classNames('table-auto-size', attrs.class)
      } else {
        return attrs.class
      }
    })

    const refresh = (force = false) => {
      if (force) {
        if (state.pagination !== false) {
          state.pagination = Object.assign(
            {},
            {
              current: 1,
              pageSize: pageSize,
            }
          )
        }
      }
      loadData(null)
    }

    const getParameter = (pagination /** filters, sorter, action */) => {
      return copy(
        {
          pageNo: (pagination && pagination.current) || (showPagination && state.pagination.current) || pageNum,
          pageSize: (pagination && pagination.pageSize) || (showPagination && state.pagination.pageSize) || pageSize,
        },
        {
          // // 待处理
          // ...filters,
          // ...sorter,
          // ...action
        }
      )
    }
    // ant table onChange(pagination, filters, sorter, { action, currentDataSource }) {}
    const loadData = (pagination) => {
      state.loading = true
      const parameter = getParameter(pagination)
      const result = load(parameter)

      if (isPromise(result)) {
        result
          .then((response) => {
            const { data = [], current = 1, total = 0 } = response
            state.pagination = showPagination
              ? copy(state.pagination, {
                  current: current,
                  total: total,
                  // showSizeChanger: showSizeChanger,
                  pageSize: (pagination && pagination.pageSize) || state.pagination.pageSize,
                })
              : false
            // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
            if (data.length === 0 && showPagination && state.pagination.current > 1) {
              state.pagination.current--
              refresh()
              return
            }

            // // 这里用于判断接口是否有返回 r.totalCount 且 this.showPagination = true 且 pageNo 和 pageSize 存在 且 totalCount 小于等于 pageNo * pageSize 的大小
            // // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
            // try {
            //   if (['auto', true].includes(showPagination) && r.total <= r.current * state.pagination.pageSize) {
            //     state.pagination.hideOnSinglePage = true
            //   }
            // } catch (e) {
            //   state.pagination = false
            // }
            if (state.pagination && total <= current * state.pagination.pageSize) {
              state.pagination.hideOnSinglePage = true
            }

            // this.localDataSource = r.data // 返回结果中的数组数据
            /// 生成序号
            if (rowNo) {
              const n = (state.pagination.current - 1) * state.pagination.pageSize
              data.forEach((row, i) => {
                row.rowNumber = i + 1 + n
              })
            }

            state.dataSource = data
            state.loading = false
          })
          .catch((e) => {
            state.loading = false
          })
      } else {
        state.loading = false
      }
    }

    const updateSelect = (keys, rows) => {
      state.selectedRowKeys = keys
      emit('select', keys, rows)
      props.rowSelection?.onChange?.call(null, keys, rows)
    }

    const clearSelected = (removeKeys) => {
      /// #mark removeKeys
      updateSelect([], [])
    }

    expose({ clearSelected, refresh })

    onBeforeMount(() => {
      if (autoload) {
        refresh()
      }
    })

    return () => {
      const tableProps = omit(props, [
        'rowNo',
        'load',
        'autoload',
        'pageNum',
        'pageSize',
        'showPagination',
        'columns',
        'dataSource',
        'selection',
        'rowSelection',
        'pagination',
        'loading',
        'onChange',
        'tbCtrl',
      ])

      return (
        <>
          <div></div>
          <Table
            {...tableProps}
            class={wrapCls.value}
            columns={columns.value}
            customRow={customRow.value}
            dataSource={state.dataSource}
            loading={state.loading}
            pagination={state.pagination}
            rowSelection={rowSelection.value}
            onChange={loadData}
            v-slots={slots}
          ></Table>
        </>
      )
    }
  },
})

export default withInstall(XTable)
