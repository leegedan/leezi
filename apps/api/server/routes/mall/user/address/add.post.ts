const data = {
    code: 0,
    "data": {
        "address": "1234",
        "areaStr": "东城区",
        "cityId": "110100",
        "cityStr": "-",
        "districtId": "110101",
        "id": 2541613,
        "linkMan": "1234",
        "mobile": "13345678945",
        "provinceId": "110000",
        "provinceStr": "北京市"
    },
    msg: "success",
};

export default eventHandler(async (event) => {
    return data;
});
