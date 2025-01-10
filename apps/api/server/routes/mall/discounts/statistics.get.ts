const data = {
    code: 0,
    data: {
        "canFetch": 0,
        "canUse": 0,
        "invalid": 3,
        "used": 0
    },
    msg: "success",
  };
  
  export default eventHandler(async (event) => {
    return data;
  });
  