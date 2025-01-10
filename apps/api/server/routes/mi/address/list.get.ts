const data = {
  code: 0,
  data: [
    {
      id: "1",
      uid: "11",
      name: "李白",
      phone: "15000112233",
      address: "长安城桃源居",
      defaultAddress: 0,
      status: 1,
    },
    {
      id: "2",
      uid: "22",
      name: "李太白",
      phone: "18155667788",
      address: "长安城泰山居黄河之水天上来",
      defaultAddress: 1,
      status: 1,
    },
  ],
  msg: "success",
};

export default eventHandler(async (event) => {
  return data;
});
