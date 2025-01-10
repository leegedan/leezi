const data = {
  id: "5a080b8fad8b300e28e2fecc",
  title: "小米5X 全网通 4GB+64GB 红色 ",
  cid: "59f1e4919bfd8f3bd030eed6",
  price: 1500,
  old_price: 1500,
  is_best: 1,
  is_hot: 0,
  is_new: 0,
  attr: [
    {
      cate: "颜色",
      list: ["黑色", "红色"],
      attrList: [],
    },
    {
      cate: "尺寸",
      list: ["6寸", "7寸"],
      attrList: [],
    },
  ],
  status: 1,
  pic: "public\\upload\\GJbaDP1jnfiQ7e7JqrCX8ngd.jpg",
  content:
    '<p><span style="font-size:24px;">小米5X 全网通 4GB+64GB 红色 移动联通电信4G手机 双卡双待</span></p><p><img src="https://img30.360buyimg.com/sku/jfs/t1/53254/37/19373/103564/629e21edE05dae5f4/67ac5b3979caae15.jpg" alt="" /></p><p><img src="https://img30.360buyimg.com/sku/jfs/t1/196996/14/15176/83602/617a4c70E834dafb5/bec61df1154abca7.jpg" alt="" /></p>',
  cname: "手机",
  salecount: 600,
  sub_title: "移动联通电信4G手机 双卡双待",
  specs:
    '<p><img src="https://img11.360buyimg.com/cms/jfs/t1/201993/18/15163/317900/618dd949E673ec317/bf62f662eed6ed76.jpg" alt="" /></p><p><img src="https://img30.360buyimg.com/sku/jfs/t1/107654/14/32509/41129/62f4dde6E58e1f9c2/b2003a003fcb8eca.jpg" alt="" /></p>',
  count: 1,
};

export default eventHandler(async (event) => {
  return {
    code: 0,
    data: data,
    msg: "success",
  };
});
