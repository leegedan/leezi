const data = {
    "code": 200,
    "message": "操作成功",
    "data": {
        "cartPromotionItemList": [
            {
                "id": 113,
                "productId": 40,
                "productSkuId": 221,
                "memberId": 11,
                "quantity": 1,
                "price": 2999.00,
                "productPic": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221104/xiaomi_12_pro_01.jpg",
                "productName": "小米12 Pro 天玑版 天玑9000+处理器 5000万疾速影像 2K超视感屏 120Hz高刷 67W快充",
                "productSubTitle": "天玑9000+处理器、5160mAh大电量、2KAmoled超视感屏【点击购买小米11Ultra，戳】 ",
                "productSkuCode": "202211040040001",
                "memberNickname": "member",
                "createDate": "2023-05-11T07:37:57.000+00:00",
                "deleteStatus": 0,
                "productCategoryId": 19,
                "productBrand": "小米",
                "productSn": "100027789721",
                "productAttr": "[{\"key\":\"颜色\",\"value\":\"黑色\"},{\"key\":\"容量\",\"value\":\"128G\"}]",
                "promotionMessage": "满减优惠：满2000.00元，减200.00元",
                "reduceAmount": 200.0000,
                "realStock": 91,
                "integration": 0,
                "growth": 0
            },
            {
                "id": 114,
                "productId": 41,
                "productSkuId": 225,
                "memberId": 11,
                "quantity": 1,
                "price": 2099.00,
                "productPic": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221104/redmi_k50_01.jpg",
                "productName": "Redmi K50 天玑8100 2K柔性直屏 OIS光学防抖 67W快充 5500mAh大电量",
                "productSubTitle": "【品质好物】天玑8100，2K直屏，5500mAh大电量【Note12Pro火热抢购中】 ",
                "productSkuCode": "202211040041001",
                "memberNickname": "member",
                "createDate": "2023-05-11T07:38:03.000+00:00",
                "deleteStatus": 0,
                "productCategoryId": 19,
                "productBrand": "小米",
                "productSn": "100035246702",
                "productAttr": "[{\"key\":\"颜色\",\"value\":\"墨羽\"},{\"key\":\"容量\",\"value\":\"128G\"}]",
                "promotionMessage": "无优惠",
                "reduceAmount": 0,
                "realStock": 195,
                "integration": 0,
                "growth": 0
            }
        ],
        "memberReceiveAddressList": [
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
        ],
        "couponHistoryDetailList": [],
        "integrationConsumeSetting": {
            "id": 1,
            "deductionPerAmount": 100,
            "maxPercentPerOrder": 50,
            "useUnit": 100,
            "couponStatus": 1
        },
        "memberIntegration": 5000,
        "calcAmount": {
            "totalAmount": 5098.00,
            "freightAmount": 0,
            "promotionAmount": 200.0000,
            "payAmount": 4898.0000
        }
    }
}

export default eventHandler(() => {
    return data
})
