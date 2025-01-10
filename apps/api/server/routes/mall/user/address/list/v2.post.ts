const data = {
    code: 0,
    "data": {
        "result": [
            {
                "address": "1234",
                "areaStr": "东城区",
                "cityId": "110100",
                "cityStr": "-",
                "dateAdd": "2025-01-03 10:42:42",
                "dateUpdate": "2025-01-03 10:42:42",
                "districtId": "110101",
                "id": 2541613,
                "isDefault": false,
                "linkMan": "1234",
                "mobile": "13345678945",
                "provinceId": "110000",
                "provinceStr": "北京市",
                "status": 0,
                "statusStr": "正常",
                "uid": 30496437,
                "userId": 1605
            },
            {
                "address": "213",
                "areaStr": "东城区",
                "cityId": "110100",
                "cityStr": "-",
                "dateAdd": "2024-11-14 19:11:06",
                "dateUpdate": "2025-01-03 10:42:27",
                "districtId": "110101",
                "id": 2498704,
                "isDefault": true,
                "linkMan": "213",
                "mobile": "13637446500",
                "provinceId": "110000",
                "provinceStr": "北京市",
                "status": 0,
                "statusStr": "正常",
                "uid": 30496437,
                "userId": 1605
            }
        ],
        "totalPage": 1,
        "totalRow": 2
    },
    msg: "success",
};

export default eventHandler(async (event) => {
    return data;
});
