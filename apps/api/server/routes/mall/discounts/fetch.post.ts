const data = {
    "code": 700,
    "msg": "暂无数据",
    "data": null
    // msg: "success",
};

export default eventHandler(async (event) => {
    return data;
});
