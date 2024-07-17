export default {
  functional: true,
  render(h, ctx) {
    const size = ctx.props['size']

    const onClick = (size) => {
      ctx.listeners['change'] && ctx.listeners['change'](size)
    }

    return (
      <el-dropdown onCommand={onClick}>
        <el-button icon="el-icon-magic-stick" size={size} circle></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled={size === 'medium'} command="medium">
            宽松
          </el-dropdown-item>
          <el-dropdown-item disabled={size === 'small'} command="small">
            默认
          </el-dropdown-item>
          <el-dropdown-item disabled={size === 'mini'} command="mini">
            紧凑
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    )
  },
}
