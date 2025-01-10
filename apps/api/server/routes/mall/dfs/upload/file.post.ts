const data = {
    code: 0,
    data: {
        "id": "4835186",
        "msg": "SUCCESS",
        "name": "cuser/1605/2025/01/03/e2344408-6633-4631-813f-cdd015f220c7.jpg",
        "originalName": "10015.jpg",
        "size": "3628",
        "type": ".jpg",
        "url": "https://dcdn.it120.cc/cuser/1605/2025/01/03/e2344408-6633-4631-813f-cdd015f220c7.jpg"
    },
    msg: "success",
};

export default eventHandler(async (event) => {
    return data;
});
