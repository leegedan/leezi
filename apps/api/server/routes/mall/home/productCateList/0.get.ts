const data = {
    "code": 200,
    "message": "操作成功",
    "data": [
        {
            "id": 1,
            "parentId": 0,
            "name": "服装",
            "level": 0,
            "productCount": 100,
            "productUnit": "件",
            "navStatus": 1,
            "showStatus": 1,
            "sort": 1,
            "keywords": "服装"
        },
        {
            "id": 2,
            "parentId": 0,
            "name": "手机数码",
            "level": 0,
            "productCount": 100,
            "productUnit": "件",
            "navStatus": 1,
            "showStatus": 1,
            "sort": 1,
            "keywords": "手机数码"
        },
        {
            "id": 3,
            "parentId": 0,
            "name": "家用电器",
            "level": 0,
            "productCount": 100,
            "productUnit": "件",
            "navStatus": 1,
            "showStatus": 1,
            "sort": 1,
            "keywords": "家用电器"
        },
        {
            "id": 4,
            "parentId": 0,
            "name": "家具家装",
            "level": 0,
            "productCount": 100,
            "productUnit": "件",
            "navStatus": 1,
            "showStatus": 1,
            "sort": 1,
            "keywords": "家具家装"
        },
        {
            "id": 5,
            "parentId": 0,
            "name": "汽车用品",
            "level": 0,
            "productCount": 100,
            "productUnit": "件",
            "navStatus": 1,
            "showStatus": 1,
            "sort": 1,
            "keywords": "汽车用品"
        },
        {
            "id": 52,
            "parentId": 0,
            "name": "电脑办公",
            "level": 0,
            "productCount": 0,
            "productUnit": "件",
            "navStatus": 1,
            "showStatus": 1,
            "sort": 1,
            "icon": "",
            "keywords": "电脑办公"
        }
    ]
}

export default eventHandler(() => {
    return data
})