// movieIndex.js
import {requestData} from '../../utils/util.js';

Page({

  data: {
    movies: [],
    start: 0,
    length: 0,
    menuSelected: true,
  },
  changeMenu(){
    this.setData({
      menuSelected: true,
    });
  },
  changeMenu1(){
    this.setData({
      menuSelected: false,
    });
  },
  intoMovieParticulars(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/movie_index/movie_particulars/movie_particulars?movie=${JSON.stringify(e.currentTarget.dataset.movie)}`,
    });
  },
  getMoviesData(){
    wx.showLoading({
      title: '电影加载中···',
      mask: true,
    });
    requestData(
        `http://m.maoyan.com/movie/list.json?type=hot&offset=${this.data.start}&limit=20`,
        (data) => {
          console.log(data);
          var temp = data.movies.map((item) => {
            item.sand = item['3d'];
            return item;
          });
          this.movies = [...this.data.movies, ...temp];
          this.setData({
            movies: this.movies,
          });
          this.data.length = data.movies.length;
          this.data.start += 20;
          wx.hideLoading();
        });
  },
  onLoad: function(options) {
    this.getMoviesData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.length===20){
      this.getMoviesData();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
});