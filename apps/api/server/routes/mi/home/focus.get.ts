const data = {
  "1": [
    {
      id: "59f6ef443ce1fb0fb02c7a43",
      title: "米家智能空气炸烤箱",
      status: "1",
      pic: "public\\upload\\zon0TTXnXUs1z5meqZhP5aNF.png",
      url: "12",
      position: 1,
    },
    {
      id: "5a012efb93ec4d199c18d1b4",
      title: "新品聚光灯",
      status: "1",
      pic: "public\\upload\\-sXMTb2kFHmRlt2BAtI47_54.png",
      url: "14",
      position: 1,
    },
    {
      id: "632d6a77b2aa96054cfcc79a",
      title: "小米新品发布会",
      status: "1",
      pic: "public\\upload\\NssHlEUvoWU36EpuF3S1URMB.png",
      url: "4",
      position: 1,
    },
  ],
  "2": [
    {
      id: "6332b1beb1ba6105c889734f",
      title: "redmi k40S",
      status: "1",
      pic: "public\\upload\\woudSGBv9MYfp01_sEILWG3s.png",
      url: "12",
      position: 2,
    },
    {
      id: "6332b1dcb1ba6105c8897350",
      title: "MIX Fold2",
      status: "1",
      pic: "public\\upload\\fWneGqwSQaBpJMt2WYLpbG8E.png",
      url: "23",
      position: 2,
    },
    {
      id: "6332b1f5b1ba6105c8897351",
      title: "全能扫拖机器人",
      status: "1",
      pic: "public\\upload\\K4-G_kiT90fftfBo0tZpYSSC.png",
      url: "23",
      position: 2,
    },
  ],
};

export default eventHandler((event) => {
  const position = getRouterParam(event, "position") || "1";

  return {
    code: 0,
    data: data[position],
    msg: "success",
  };
});
