const data = {
    code: 0,
    data: {
        "type": 2,
        "deductionScore": "2341"
    },
    msg: "success",
};

export default eventHandler(async (event) => {
    return data;
});
