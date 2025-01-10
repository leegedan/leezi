const data = {
    code: 0,
    "data": {
        "goodsStatus": [
            {
                "id": 1052000,
                "name": "实物商品（购买时需填写收货地址，支持售后）",
                "sellEnd": false,
                "sellStart": true,
                "status": 0,
                "statusStr": "上架",
                "stores": 938
            }
        ],
        "items": [
            {
                "categoryId": 272693,
                "goodsId": 1052000,
                "key": "e9e8f6c447db64b9968e2a6b040324bc",
                "logisticsId": 4727,
                "minBuyNumber": 1,
                "name": "实物商品（购买时需填写收货地址，支持售后）",
                "number": 1,
                "originalPrice": 199,
                "overseas": false,
                "pic": "https://dcdn.it120.cc/2022/02/04/fa78ff5e-553f-40f2-8c78-b7ab8ed8bd39.png",
                "price": 1,
                "priceShopSell": 0,
                "score": 0,
                "selected": true,
                "shopId": 0,
                "status": 0,
                "statusStr": "上架",
                "stores": 938,
                "type": 0,
                "weight": 0
            }
        ],
        "number": 1,
        "price": 1,
        "score": 0,
        "shopList": [
            {
                "id": 0,
                "name": "其他",
                "serviceDistance": 99999999
            }
        ]
    },
    msg: "success",
};

export default eventHandler(async (event) => {
    return data;
});
