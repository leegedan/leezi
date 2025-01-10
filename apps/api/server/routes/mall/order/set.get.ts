const data = {
    code: 0,
    "data": {
        "alarmNotranceHours": 0,
        "autoDeliveryDays": 7,
        "autoReputationDays": 7,
        "benefitFreightToshop": false,
        "benefitOpen": true,
        "closeMinute": 60,
        "dadaAutoSubmit": true,
        "endDays": 30,
        "grab": false,
        "hxRole": true,
        "open": true,
        "refundBeforeFahuo": false,
        "scoreExchange": 1,
        "successAfterPay": false,
        "thirdPeisongFeeMod": 0
    },
    msg: "success",
};

export default eventHandler(async (event) => {
    return data;
});
