// cinema.js
import {requestData} from '../../utils/util.js';
Page({


  data: {
    cinema:[]
  },
  initCinema(data){
    console.log(data);
    for (var key in data){
      for (var item of data[key]){
        item.movieId=this.data.movieId;
        this.data.cinema.push(item)
      }
    }
    this.setData({
      cinema:this.data.cinema
    });
    console.log(this.data.cinema)
  },

  onLoad: function (options) {
    requestData(`http://m.maoyan.com/cinemas.json`,(data)=>{
      this.initCinema(data)
    });
  },
  intoSelectScreening(e){
    console.log(e);
    wx.navigateTo({
      url: `/pages/cinema/select_screening/select_screening?cinemaId=${e.currentTarget.dataset.cinemaid}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})