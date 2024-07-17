import Mock from 'mockjs'

export default eventHandler(() => {
  return {
    code: 200,
    msg: 'success',
    data: [
      { id: 1, name: '产品部', parentId: 0, manager: Mock.mock('@cname') },
      { id: 2, name: '研发部', parentId: 0, manager: Mock.mock('@cname') },
      { id: 3, name: '销售部', parentId: 0, manager: Mock.mock('@cname') },
      { id: 4, name: '财务部', parentId: 0, manager: Mock.mock('@cname') },
      { id: 11, name: '产品一组', parentId: 1, manager: Mock.mock('@cname') },
      { id: 21, name: '研发一组', parentId: 2, manager: Mock.mock('@cname') },
      { id: 22, name: '研发二组', parentId: 2 },
      { id: 31, name: '销售一组', parentId: 3, manager: Mock.mock('@cname') },
      { id: 32, name: '销售二组', parentId: 3 },
      { id: 33, name: '销售三组', parentId: 3, manager: Mock.mock('@cname') },
      { id: 41, name: '财务一组', parentId: 4, manager: Mock.mock('@cname') },
    ],
  }
})
