const data = {
  code: 0,
  data: {
    uid: "10000",
    token: "6F0D50EC-3FE6-820B-BE2D-74DF1A39ED35",
  },
  msg: "success",
};

export default eventHandler(async (event) => {
  return data;
});
