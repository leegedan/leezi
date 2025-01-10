const data = [
  {
    id: "6332bc60a3a7080ac06eaee8",
    title: "小米12s",
    cid: "59f1e4919bfd8f3bd030eed6",
    price: 2999,
    pic: "public\\upload\\5xyr9OTSK1pwJ5ng7YgpKOkd.png",
    sub_title: "下单立减100",
    s_pic: "public\\upload\\5xyr9OTSK1pwJ5ng7YgpKOkd.png_200x200.png",
  },
  {
    id: "6332baefa3a7080ac06eaee7",
    title: "Note11 5G",
    cid: "59f1e1ada1da8b15d42234e9",
    price: 1199,
    pic: "public\\upload\\FFUxpJKHp3PteuEDMhO0c7v3.png",
    sub_title: "券后优惠100元",
    s_pic: "public\\upload\\FFUxpJKHp3PteuEDMhO0c7v3.png_200x200.png",
  },
  {
    id: "6332ba28a3a7080ac06eaee6",
    title: "MAX x86",
    cid: "59f1e1ada1da8b15d42234e9",
    price: 5999,
    pic: "public\\upload\\0AY3Cpw19ZQ2AkYjbA1tQY-Z.png",
    sub_title: "双120Hz高刷",
    s_pic: "public\\upload\\0AY3Cpw19ZQ2AkYjbA1tQY-Z.png_200x200.png",
  },
];

export default eventHandler((event) => {
  return {
    code: 0,
    data: data,
    msg: "success",
  };
});
