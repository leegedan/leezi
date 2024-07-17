export default eventHandler(async (e) => {
  const body = await readBody(e)

  let data = <any>[]
  if (body.id === 1) {
    data = [
      { id: '1', value: '绿蚁新醅酒' },
      { id: '2', value: '红泥小火炉' },
      { id: '3', value: '晚来天欲雪' },
      { id: '4', value: '能饮一杯无' },
    ]
  } else if (body.id === 2) {
    data = [
      { id: '1', value: '移舟泊烟渚' },
      { id: '2', value: '日暮客愁新' },
      { id: '3', value: '野旷天低树' },
      { id: '4', value: '江清月近人' },
    ]
  } else {
    data = [
      { id: '1', value: '人闲桂花落' },
      { id: '2', value: '夜静春山空' },
      { id: '3', value: '月出惊山鸟' },
      { id: '4', value: '时鸣春涧中' },
    ]
  }
  return {
    code: 200,
    msg: 'success',
    data: data,
  }
})
