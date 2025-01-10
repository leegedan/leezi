const data = {
    "code": 200,
    "message": "操作成功",
    "data": [
        {
            "id": 53,
            "parentId": 52,
            "name": "平板电脑",
            "level": 1,
            "productCount": 0,
            "productUnit": "件",
            "navStatus": 0,
            "showStatus": 1,
            "sort": 0,
            "icon": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221028/pad_category_01.jpg",
            "keywords": "平板电脑"
        },
        {
            "id": 54,
            "parentId": 52,
            "name": "笔记本",
            "level": 1,
            "productCount": 0,
            "productUnit": "件",
            "navStatus": 0,
            "showStatus": 1,
            "sort": 0,
            "icon": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221028/computer_category_01.jpg",
            "keywords": "笔记本"
        },
        {
            "id": 55,
            "parentId": 52,
            "name": "硬盘",
            "level": 1,
            "productCount": 0,
            "productUnit": "",
            "navStatus": 0,
            "showStatus": 1,
            "sort": 0,
            "icon": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221108/ssd_category_01.jpg",
            "keywords": "硬盘"
        }
    ]
}

export default eventHandler(() => {
    return data
})
