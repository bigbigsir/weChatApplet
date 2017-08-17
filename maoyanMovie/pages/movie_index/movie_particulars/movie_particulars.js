// movie_particulars.js
import {requestData, requestData1} from '../../../utils/util.js';
Page({

  data: {
    movieItem: {},
    maoYanMovie: {},
    douBanMovie: {},
    enName: '',
    changeHeight: false,
    changeRotate: false,
    isLook: false,
    isGrade: false,
    gray_heart: '../../../img/heart-gray.png',
    red_heart: '../../../img/heart-red.png',
    gray_star: '../../../img/none-star.png',
    red_star: '../../../img/star.png',
  },
  changeContentHeight(){
    this.setData({
      changeHeight: !this.data.changeHeight,
      changeRotate: !this.data.changeRotate,
    });
  },
  changeIsLook(){
    this.setData({
      isLook: !this.data.isLook,
    });
  },
  changeIsGrade(){
    this.setData({
      isGrade: !this.data.isGrade,
    });
  },
  intoSelectCinema(e){
    wx.navigateTo({
      url: `/pages/cinema/select_cinema/select_cinema?movie=${JSON.stringify(e.currentTarget.dataset.movie)}`,
    });
  },
  getMovieParticulars(){
    requestData(`http://m.maoyan.com/movie/${this.data.movieItem.id}.json`,
        (data) => {
          data.MovieDetailModel.starWidth = data.MovieDetailModel.sc * 10 + '%';
          data.MovieDetailModel.snum = data.MovieDetailModel.snum > 10000 ?
              (data.MovieDetailModel.snum / 10000).toFixed(1) + '万' :
              data.MovieDetailModel.snum;
          data.MovieDetailModel.rt = data.MovieDetailModel.rt.split('上映')[0];
          data.MovieDetailModel.dra = data.MovieDetailModel.dra.split('>')[1].split('<')[0];

          this.setData({
            maoYanMovie: data.MovieDetailModel,
          });
          console.log(this.data.maoYanMovie);
        });
  },
  onLoad: function(options) {
    this.setData({
      movieItem: JSON.parse(options.movie),
    });
    this.getMovieParticulars();
    requestData1(
        `https://api.douban.com/v2/movie/search?q=${this.data.movieItem.nm}`,
        (data) => {
          requestData1(
              `https://api.douban.com/v2/movie/subject/${data.subjects[0].id}`,
              (data) => {
                var reg = new RegExp(/[a-zA-Z]/);
                for (var val of data.aka) {
                  if (reg.test(val)) {
                    this.setData({
                      enName: val,
                    });
                  }
                }
                this.setData({
                  douBanMovie: data,
                });
              });
        });
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

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
});