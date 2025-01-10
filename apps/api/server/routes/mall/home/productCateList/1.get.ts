const data = {
    "code": 200,
    "message": "操作成功",
    "data": [
        {
            "id": 7,
            "parentId": 1,
            "name": "外套",
            "level": 1,
            "productCount": 100,
            "productUnit": "件",
            "navStatus": 1,
            "showStatus": 1,
            "sort": 0,
            "icon": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190519/5ac4780cN6087feb5.jpg",
            "keywords": "外套"
        },
        {
            "id": 8,
            "parentId": 1,
            "name": "T恤",
            "level": 1,
            "productCount": 100,
            "productUnit": "件",
            "navStatus": 1,
            "showStatus": 1,
            "sort": 0,
            "icon": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190519/5ac47ffaN8a7b2e14.png",
            "keywords": "T恤"
        },
        {
            "id": 9,
            "parentId": 1,
            "name": "休闲裤",
            "level": 1,
            "productCount": 100,
            "productUnit": "件",
            "navStatus": 1,
            "showStatus": 1,
            "sort": 0,
            "icon": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190519/5ac47845N7374a31d.jpg",
            "keywords": "休闲裤"
        },
        {
            "id": 10,
            "parentId": 1,
            "name": "牛仔裤",
            "level": 1,
            "productCount": 100,
            "productUnit": "件",
            "navStatus": 1,
            "showStatus": 1,
            "sort": 0,
            "icon": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190519/5ac47841Nff658599.jpg",
            "keywords": "牛仔裤"
        },
        {
            "id": 11,
            "parentId": 1,
            "name": "衬衫",
            "level": 1,
            "productCount": 100,
            "productUnit": "件",
            "navStatus": 1,
            "showStatus": 1,
            "sort": 0,
            "icon": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190519/5ac48007Nb30b2118.jpg",
            "keywords": "衬衫"
        }
    ]
}

export default eventHandler(() => {
    return data
})