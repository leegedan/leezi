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
      billNo: `DD${Mock.mock('@integer(100000, 999999)')}`,
      sku: Mock.mock('@ctitle'),
      price: Mock.mock('@integer(3000, 90000)'),
      count: Mock.mock('@integer(1, 99)'),
      custom: Mock.mock('@cname'),
      amount: Mock.mock('@integer(300050, 5000000)'),
      create: Mock.mock('@date'),
    })),
  }
})
