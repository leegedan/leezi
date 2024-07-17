
// import Mock from 'mockjs'
// export default eventHandler((event) => {
//     const token = getHeader(event, 'Authorization')
//     const username = Buffer.from(token, 'base64').toString('utf-8')
//     if (!token) {
//       return {
//         code: 401,
//         msg: '登录失效',
//       }
//     }
//     return {
//       code: 200,
//       msg: '获取成功',
//       data: {
//         id: 1,
//         username,
//         nickname: username === 'admin' ? '红泥小火炉' : '红泥小火炉',
//         avatar: '/static/avatar.png',
//         roles: username === 'admin' ? ['ADMIN'] : ['USER'],
//       },
//     }
//   })

export default eventHandler(() => {
    return {
        code: 200,
        msg: 'success',
        data: {
            id: 1,
            username: 'admin',
            nickname: '红泥小火炉',
            avatar: '/static/avatar.png',
            roles: ['ADMIN'],
            lang: 'zh-CN'
            // token: Mock.mock('@guid'),
        }
    }
})
