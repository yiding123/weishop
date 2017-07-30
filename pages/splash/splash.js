var app = getApp();
/**
 * 使用 Page 初始化页面，具体可参考微信公众平台上的文档
 */
Page({
  /**
   * 初始数据
   */
  data: {

  },
  onShow() {
   
  },
  onReady() {

  },
  onLoad() {
		app.admx.request({
			url: app.config.service.getshopinfo,
			data: {
				shopcode: 'JMD20170729150002'
			},
			succ: function (res) {
				if (res.list[0]) {
					app.globalData.shopinfo = res.list[0];
          wx.redirectTo({
            url: '../index/index'
          })
				} else{
					wx.showModal({
						showCancel:false,
						content: '店铺信息不存在'
					})
				}
			}
		})
  }

});
