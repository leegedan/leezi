const data = {
    "code": 200,
    "message": "操作成功",
    "data": [
        {
            "id": 5,
            "memberId": 11,
            "name": "小李",
            "phoneNumber": "18961511111",
            "defaultStatus": 1,
            "postCode": "518000",
            "province": "广东省",
            "city": "深圳市",
            "region": "福田区",
            "detailAddress": "东晓街道"
        },
        {
            "id": 6,
            "memberId": 11,
            "name": "小李",
            "phoneNumber": "18961511111",
            "postCode": "518000",
            "province": "广东省",
            "city": "深圳市",
            "region": "福田区",
            "detailAddress": "清水河街道"
        }
    ]
}

export default eventHandler(() => {
    return data
})
