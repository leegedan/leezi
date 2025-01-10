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
                "stores": 950
            },
            {
                "id": 157447,
                "name": "虚拟商品（购买时无需填写收货地址，无需物流）",
                "sellEnd": false,
                "sellStart": true,
                "status": 0,
                "statusStr": "上架",
                "stores": 856
            }
        ],
        "items": [
            {
                "categoryId": 272693,
                "goodsId": 157447,
                "key": "8b10820fb5ec0f97066beba1c3f3c6be",
                "logisticsId": 0,
                "minBuyNumber": 1,
                "name": "虚拟商品（购买时无需填写收货地址，无需物流）",
                "number": 2,
                "originalPrice": 99,
                "overseas": false,
                "pic": "https://dcdn.it120.cc/2022/02/04/b5017470-29bb-43a3-b34c-56cdf6b0fb05.png",
                "price": 0.01,
                "priceShopSell": 0,
                "score": 0,
                "selected": true,
                "shopId": 0,
                "status": 0,
                "statusStr": "上架",
                "stores": 856,
                "type": 1,
                "weight": 0
            },
            {
                "categoryId": 272693,
                "goodsId": 1052000,
                "key": "e9e8f6c447db64b9968e2a6b040324bc",
                "logisticsId": 4727,
                "minBuyNumber": 1,
                "name": "实物商品（购买时需填写收货地址，支持售后）",
                "number": 6,
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
                "stores": 950,
                "type": 0,
                "weight": 0
            }
        ],
        "number": 8,
        "price": 6.02,
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
