import Mock from 'mockjs'

export function copy(len: number = 10, fun: Function) {
  const data = []
  while (len--) {
    data.push(fun())
  }
  return data
}

export default eventHandler(() => {
  return {
    code: 200,
    msg: 'success',
    total: 128,
    current: 2,
    data: copy(10, () => ({
      id: Mock.mock('@id'),
      avatar: Mock.Random.image('200x200', Mock.mock('@hex'), '#ffffff', Mock.mock('@cfirst')),
      name: Mock.mock('@cname'),
      age: Mock.mock('@integer(18, 70)'),
      phone: `${Mock.mock('@integer(12000000000, 19999999999)')}`,
      salary: Mock.mock('@integer(300050, 5000000)'),
      join: Mock.mock('@date'),
      deptId: Mock.mock('@pick(["1", "2", "3", "4", "11", "21", "22", "31", "32", "33", "41"])'),
      desc: Mock.mock('@pick([ "1", "2", "3", "4"])'),
      status: Mock.mock('@pick(["1", "1", "1", "2", "3"])'), // 在职， 离职， 停职
    })),
  }
})
