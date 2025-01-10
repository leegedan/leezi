const data = {
  code: 0,
  data: [
    {
      loop: true,
      money: 100,
      score: 100,
      type: 2,
      label: "兑换成现金",
      desc: "100 积分兑换 100 金额，兑换成功后，可以在我的钱包查看。",
      icon: "/src/assets/images/74351043305a48e90e17c26d215e6dc5.png",
    },
  ],
  msg: "success",
};

export default eventHandler(async (event) => {
  return data;
});
