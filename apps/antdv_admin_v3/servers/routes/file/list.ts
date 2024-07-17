import Mock from 'mockjs'

export function copy(len: number = 10, fun: Function) {
  const data = []
  while (len--) {
    data.push(fun())
  }
  return data
}

export default eventHandler(() => {
  const len = (Math.random() * 5 + 5) >>> 0
  return {
    code: 200,
    msg: 'success',
    data: copy(len, () => ({
      id: Mock.mock('@id'),
      filename: Mock.mock('@word') + Mock.mock('@pick([".png", ".jpg", ".mp3", ".ppt", ".xlsx", ".zip", ".pdf"])'),
      url: Mock.Random.image(),
    })),
  }
})
