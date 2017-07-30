var app = getApp();
var utils = app.admx.utils;
/**
 * 使用 Page 初始化页面，具体可参考微信公众平台上的文档
 */
Page({

  /**
   * 初始数据
   */
  data: {
    shopinfo: null,
    shopimgs:null
  },

  onLoad: function (options) {
    var that = this;
    this.setData({
      shopinfo: app.globalData.shopinfo
    })
    this._getShopImgs();
  },
  makeCall:function(e){
    console.log(e.currentTarget.dataset.tel);
    var tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  //在地图上打开位置
  openLocation:function(e){
    var location = e.currentTarget.dataset.loc;
    var shopname = e.currentTarget.dataset.shopname;
    var address = e.currentTarget.dataset.address;
    console.log(e.currentTarget.dataset);
    console.log(location.split(",")[0])
    console.log(location.split(",")[1])
    wx.openLocation({
      latitude: location.split(",")[1],
      longitude: location.split(",")[0],
      name: shopname,
      address:address,
      complete:function(){
        console.log("----complete");
      }
    })
  },
  //预览图片
  previewImg: function(e){
    console.log(e);
    console.log(e.currentTarget.dataset.img);
    var urls = [];
    console.log(this.data.shopimgs);
    for (var i = 0; i < this.data.shopimgs.length ;i++){
      console.log(this.data.shopimgs[i].imgs[0]);
      urls.push(this.data.shopimgs[i].imgs[0]);
    }
    wx.previewImage({
      current: e.currentTarget.dataset.img, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  //获取门店图片
  _getShopImgs:function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    console.log("--_getShopImgs");
    app.admx.request({
      url: app.config.service.getshopimgs,
      data: {
        shopid: that.data.shopinfo.id
      },
      succ: function (res) {
        if (res.list[0]) {
          that.setData({
            shopimgs:res.list
          })
        }
      },
      complete:function(){
        wx.hideLoading();
      }
    })
  }

});
