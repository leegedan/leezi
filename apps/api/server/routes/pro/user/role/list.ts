export default eventHandler(() => {
  return {
    code: 200,
    msg: 'success',
    data: [
      { id: 1, name: '超级管理员' },
      { id: 2, name: '开发' },
      { id: 3, name: '测试' },
    ],
  }
})
