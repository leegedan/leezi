const data = {
    code: 0,
    "data": {
        "amount": 6.02,
        "amountCard": 0,
        "amountCoupons": 0,
        "amountLogistics": 0,
        "amountReal": 6.02,
        "amountRefundTotal": 0,
        "amountTax": 0,
        "amountTaxGst": 0,
        "amountTaxService": 0,
        "autoDeliverStatus": 0,
        "dateAdd": "2025-01-03 10:43:53",
        "dateClose": "2025-01-03 11:43:53",
        "differHours": 0,
        "goodsNumber": 8,
        "gotScore": 5000,
        "hasRefund": false,
        "hoursToAppointmentTime": 0,
        "id": 5705839,
        "ip": "116.128.236.84",
        "isCanHx": false,
        "isDelUser": false,
        "isEnd": false,
        "isHasBenefit": false,
        "isNeedLogistics": true,
        "isPay": false,
        "isScoreOrder": false,
        "isSuccessPingtuan": false,
        "jd8Status": 0,
        "nearbyCloseMillis": 3599773,
        "orderNumber": "250103104316050002",
        "orderType": 0,
        "periodAutoPay": false,
        "pid": 0,
        "qudanhao": "0002",
        "refundStatus": 0,
        "remark": "",
        "score": 0,
        "scoreDeduction": 0,
        "shopId": 0,
        "status": 0,
        "statusStr": "待支付",
        "trips": 0,
        "type": 0,
        "uid": 30496437,
        "userId": 1605
    },
    msg: "success",
};

export default eventHandler(async (event) => {
    return data;
});
