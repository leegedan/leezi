export default {
  functional: true,
  render(h, ctx) {
    const onClick = () => {
      ctx.listeners['clear'] && ctx.listeners['clear']()
    }
    return (
      <span>
        <span>已选择 {ctx.props['n'] || 0} 项，</span>
        <a onClick={onClick}>
          取消已选项
        </a>
      </span>
    )
  },
}
