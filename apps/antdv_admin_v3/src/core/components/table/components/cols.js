export default {
  functional: true,
  props: {
    cols: {
      type: Array,
      default: [],
    },
    size: String
  },
  render(h, ctx) {
    const cols = ctx.props['cols']
    const size = ctx.props['size']
    const len = cols.length
    const selected = cols.filter((c) => c.checked).length
    const isIndeterminate = selected > 0 && selected < len
    const allChecked = selected === len

    console.log(cols)

    const change = (val) => {
      ctx.listeners['change'] && ctx.listeners['change'](val)
    }

    const onCheckAll = () => {
      change(
        cols.map((col) => {
          col.checked = !allChecked
          return { ...col }
        })
      )
    }

    const onCheck = (c) => {
      change(
        cols.map((col) => {
          return col.prop === c.prop ? { ...col, checked: !col.checked } : col
        })
      )
    }

    return (
      <el-popover placement="bottom-end" width="120" trigger="hover">
        <el-button slot="reference" icon="el-icon-setting" circle size={size}></el-button>
        <div>
          <el-checkbox indeterminate={isIndeterminate}  checked={allChecked} onChange={onCheckAll}>
            { allChecked ? '反选' : '全选' }
          </el-checkbox>
          {cols.map((col) => {
            return (
              <el-checkbox checked={col.checked} onChange={() => onCheck(col)} style="display: block;">
                {col.label}
              </el-checkbox>
            )
          })}
        </div>
      </el-popover>
    )
  },
}
