const data = {
  code: 0,
  data: "000000",
  msg: "success",
};

export default eventHandler(async (event) => {
  return data;
});
