const data = {
    code: 0,
    "data": [
        {
            "id": 272693,
            "isUse": true,
            "level": 1,
            "name": "测试分类",
            "paixu": 0,
            "pid": 0,
            "shopId": 0,
            "userId": 1605
        },
        {
            "id": 37962,
            "isUse": true,
            "level": 1,
            "name": "手机",
            "paixu": 1,
            "pid": 0,
            "shopId": 0,
            "userId": 1605
        },
        {
            "id": 37963,
            "isUse": true,
            "level": 1,
            "name": "智能",
            "paixu": 1,
            "pid": 0,
            "shopId": 0,
            "userId": 1605
        },
        {
            "id": 37964,
            "isUse": true,
            "level": 1,
            "name": "电视",
            "paixu": 1,
            "pid": 0,
            "shopId": 0,
            "userId": 1605
        },
        {
            "id": 37965,
            "isUse": true,
            "level": 1,
            "name": "家电",
            "paixu": 1,
            "pid": 0,
            "shopId": 0,
            "userId": 1605
        },
        {
            "id": 37966,
            "isUse": true,
            "level": 1,
            "name": "笔记本",
            "paixu": 1,
            "pid": 0,
            "shopId": 0,
            "userId": 1605
        },
        {
            "id": 37967,
            "isUse": true,
            "level": 1,
            "name": "生活周边",
            "paixu": 1,
            "pid": 0,
            "shopId": 0,
            "userId": 1605
        }
    ],
    msg: "success",
};

export default eventHandler(async (event) => {
    return data;
});
