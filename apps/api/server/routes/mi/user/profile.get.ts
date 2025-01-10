const data = {
  code: 0,
  data: {
    id: "10000",
    username: "tony",
    tel: "16855668899",
    password: "c831b04de153469d",
    salt: "f379eaf3c831b04de153469d1bec345e",
    gold: 88,
    coupon: 2,
    redPacket: 6,
    quota: 16,
    collect: 7,
    footmark: 8,
    follow: 9,
  },
  msg: "success",
};

export default eventHandler(async (event) => {
  return data;
});
