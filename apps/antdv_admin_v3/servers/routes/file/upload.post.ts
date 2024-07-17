import Mock from 'mockjs'
export default eventHandler(() => {
    return {
        code: 200,
        msg: 'success',
        data: {
            id: Mock.mock('@id'),
            filename: Mock.mock('@word') + Mock.mock('@pick([".png", ".jpg", ".mp3", ".ppt", ".xlsx", ".zip", ".pdf"])'),
            url: Mock.Random.image(),
        }
    }
})
