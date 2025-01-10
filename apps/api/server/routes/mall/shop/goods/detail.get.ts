const data = {
    code: 0,
    "data": {
        "basicInfo": {
            "afterSale": "0",
            "categoryId": 272693,
            "characteristic": "本商城所有商品，都是测试商品，仅限线上调试，模拟交易流程",
            "commission": 0,
            "commissionSettleType": 0,
            "commissionType": 0,
            "commissionUserType": 0,
            "dateAdd": "2023-06-28 18:24:57",
            "dateUpdate": "2025-01-02 10:23:01",
            "discountPrice": 0,
            "fxType": 2,
            "gotScore": 500,
            "gotScoreType": 0,
            "hasAddition": false,
            "hasTourJourney": false,
            "hidden": 0,
            "id": 1497625,
            "kanjia": false,
            "kanjiaPrice": 0,
            "limitation": false,
            "logisticsId": 4727,
            "maxCoupons": 1,
            "miaosha": false,
            "minBuyNumber": 1,
            "minPrice": 1,
            "minPriceOriginal": 1,
            "minScore": 0,
            "name": "实物商品（购买时需填写收货地址，支持售后）",
            "numberFav": 0,
            "numberGoodReputation": 0,
            "numberOrders": 84,
            "numberReputation": 5,
            "numberSells": 177,
            "originalPrice": 199,
            "overseas": false,
            "paixu": 0,
            "persion": 0,
            "pic": "https://dcdn.it120.cc/2022/02/04/fa78ff5e-553f-40f2-8c78-b7ab8ed8bd39.png",
            "pingtuan": false,
            "pingtuanPrice": 0,
            "priceShopSell": 0,
            "recommendStatus": 1,
            "recommendStatusStr": "推荐",
            "seckillBuyNumber": 0,
            "sellEnd": false,
            "sellStart": true,
            "shopId": 0,
            "status": 0,
            "statusStr": "上架",
            "storeAlert": false,
            "stores": 609,
            "stores0Unsale": false,
            "storesExt1": 0,
            "storesExt2": 0,
            "type": 0,
            "unit": "件",
            "unusefulNumber": 0,
            "usefulNumber": 0,
            "userId": 1605,
            "vetStatus": 1,
            "views": 9299,
            "weight": 0
        },
        "category": {
            "id": 272693,
            "isUse": true,
            "name": "测试分类",
            "paixu": 0,
            "pid": 0,
            "shopId": 0,
            "userId": 1605
        },
        "content": "<p><font color=\"#E03E2D\">【特别提醒】</font><br /><font color=\"#E03E2D\">1.测试商品，仅限调试。</font><br /><font color=\"#E03E2D\">2.下单消费，个人中心 -&gt; 积分兑换 -&gt; 兑换成余额进行消费。</font><br /><font color=\"#E03E2D\">2.实物商品购买时需要填写收货地址，订单使用快递发货。</font></p>\n<p><font color=\"#E03E2D\"><img src=\"https://dcdn.it120.cc/2022/02/04/fa78ff5e-553f-40f2-8c78-b7ab8ed8bd39.png\" alt=\"\" width=\"640\" height=\"640\" /></font></p>\n<p>&nbsp;</p>\n<p><audio style=\"display: none;\" controls=\"controls\"></audio></p>",
        "extJson": {},
        "extJson2": {},
        "logistics": {
            "details": [],
            "feeType": 0,
            "feeTypeStr": "按件数",
            "isFree": true
        },
        "pics": [
            {
                "goodsId": 1497625,
                "id": 6694640,
                "pic": "https://dcdn.it120.cc/2022/02/04/fa78ff5e-553f-40f2-8c78-b7ab8ed8bd39.png",
                "userId": 1605
            }
        ],
        "pics2": [
            "https://dcdn.it120.cc/2022/02/04/fa78ff5e-553f-40f2-8c78-b7ab8ed8bd39.png"
        ],
        "subPics": []
    },
    msg: "success",
};

export default eventHandler(async (event) => {
    return data;
});
