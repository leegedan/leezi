export default eventHandler(() => {
  return {
    code: 200,
    msg: 'success',
    data: [{ id: 1, name: 'admin', userName: 'admin', roleId: 1, staffId: 0, staffName: '' }, { id: 2, name: 'dev', userName: 'dev', roleId: 2, staffId: 1, staffName: '' }, { id: 3, name: 'user1', userName: 'user1', roleId: 3, staffId: 2, staffName: '大宝' }],
  }
})
