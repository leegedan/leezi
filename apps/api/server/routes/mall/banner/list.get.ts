const data = {
    "code": 0,
    "data": [
        {
            "businessId": 0,
            "dateAdd": "2017-12-04 10:35:09",
            "dateUpdate": "2022-02-02 16:19:07",
            "id": 2772,
            "linkType": 0,
            "linkUrl": "",
            "paixu": 2,
            "picUrl": "https://cdn.it120.cc/apifactory/2019/06/18/4c458676-85bb-4271-91a6-79ed9fc47545.jpg",
            "remark": "",
            "shopId": 0,
            "status": 0,
            "statusStr": "显示",
            "title": "首页banner2",
            "type": "indexBanner",
            "userId": 1605
        },
        {
            "businessId": 0,
            "dateAdd": "2017-12-04 10:34:35",
            "dateUpdate": "2022-02-02 16:19:13",
            "id": 2771,
            "linkType": 0,
            "linkUrl": "",
            "paixu": 2,
            "picUrl": "https://cdn.it120.cc/apifactory/2019/06/18/06b337d7-92a1-498b-8142-5c5951e8fb97.jpg",
            "remark": "",
            "shopId": 0,
            "status": 0,
            "statusStr": "显示",
            "title": "首页banner1",
            "type": "indexBanner",
            "userId": 1605
        }
    ],
    "msg": "success"
};

export default eventHandler(async (event) => {
    return data;
});
