const data = {
  code: 0,
  data: {
    balance: 385.87,
    freeze: 0,
    fxCommisionPaying: 0,
    growth: 0,
    score: 20599,
    scoreLastRound: 0,
    totalPayAmount: 14.13,
    totalPayNumber: 13,
    totalRechargeAmount: 0,
    totalScore: 20999,
    totalWithdraw: 0,
    totleConsumed: 0,
  },
  msg: "success",
};

export default eventHandler(async (event) => {
  return data;
});
