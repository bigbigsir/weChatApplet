// select_cinema.js
import {requestData} from '../../../utils/util.js';
var app = getApp();
Page({

  data: {
    cinema:[],
    movie:{},
    selectDate:1
  },
  initCinema(data){
    console.log(data);
    for (var key in data){
      for (var item of data[key]){
        item.movie=this.data.movie;
        this.data.cinema.push(item)
      }
    }
    this.setData({
      cinema:this.data.cinema
    });
    console.log(this.data.cinema)
  },

  onLoad: function (options) {
    this.data.movie=JSON.parse(options.movie);
    console.log(this.data.movie);
    requestData(`http://m.maoyan.com/cinemas.json`,(data)=>{
      this.initCinema(data)
    });
    wx.setNavigationBarTitle({
      title: this.data.movie.nm||'选择影院'
    });
  },

  changeSelectDate(e){
    this.setData({
      selectDate:e.currentTarget.dataset.date
    })
  },
  intoSelectScreening(e){
    wx.navigateTo({
      url: `/pages/cinema/select_screening/select_screening?movie=${JSON.stringify(e.currentTarget.dataset.movie)}&cinemaId=${e.currentTarget.dataset.cinemaid}`
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
});