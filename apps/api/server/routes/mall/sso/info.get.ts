const data = {
    "code": 200,
    "message": "操作成功",
    "data": {
        "id": 11,
        "memberLevelId": 4,
        "username": "member",
        "password": "$2a$10$Q08uzqvtPj61NnpYQZsVvOnyilJ3AU4VdngAcJFGvPhEeqhhC.hhS",
        "nickname": "member",
        "phone": "18961511111",
        "status": 1,
        "createTime": "2023-05-11T07:22:38.000+00:00",
        "icon": "https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/icon/github_icon_02.png",
        "gender": 1,
        "birthday": "2009-05-31T16:00:00.000+00:00",
        "city": "上海",
        "job": "学生",
        "personalizedSignature": "member",
        "integration": 5000,
        "growth": 1000
    }
}

export default eventHandler(() => {
    return data
  })
  