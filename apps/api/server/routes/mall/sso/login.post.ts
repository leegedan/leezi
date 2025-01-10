const data = {
    "code": 200,
    "message": "操作成功",
    "data": {
        "tokenHead": "Bearer ",
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtZW1iZXIiLCJjcmVhdGVkIjoxNzI0NzUxMzUxMTgzLCJleHAiOjE3MjUzNTYxNTF9.tXdSXT-8HiQftljYWOU6zsvQS2pAcJyXnfJlJvUMvCgYdkIp3Y-naut4Hp0_ove3n5RwxkdLjlSRBMmHQgVydg"
    }
}

export default eventHandler(() => {
    return data
})