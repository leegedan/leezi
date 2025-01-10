export default eventHandler(async (event) => {
  const { code } = await readBody(event);
  if (code === "000000") {
    return {
      code: 0,
      msg: "success",
    };
  } else {
    return {
      code: 1,
      msg: "验证码不正确",
    };
  }
});
