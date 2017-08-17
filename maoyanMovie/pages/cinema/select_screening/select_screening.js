// select_screening.js
import {requestData} from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieID:'',
    movie:{},
    cinema:{},
    dateShow:'',
    selectDate:""
  },
  changeSelectDate(e){
    console.log(this.data.selectDate);
    console.log(e.currentTarget.dataset.date);
    this.setData({
      dateShow:this.data.cinema.DateShow[e.currentTarget.dataset.date],
      selectDate:e.currentTarget.dataset.date
    })
  },
  intoSelectSeat(e){
    wx.navigateTo({
      url: `/pages/cinema/select_seat/select_seat?screening=${JSON.stringify(e.currentTarget.dataset)}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.movie){
      this.setData({
        movieID:JSON.parse(options.movie).id
      });
    }
    requestData(`http://m.maoyan.com/showtime/wrap.json?cinemaid=${options.cinemaId}&movieid=${this.data.movieID||''}`,(data)=>{
      console.log(data);
      requestData(`http://m.maoyan.com/movie/${data.currentMovie.id}.json`,(data)=>{
        console.log(data);
        data.MovieDetailModel.cat=data.MovieDetailModel.cat.split(',')[0];
        var starArr=data.MovieDetailModel.star.split(' ');
        data.MovieDetailModel.star=starArr[0]+','+starArr[1]+','+starArr[2];
        this.setData({
          movie:data.MovieDetailModel
        });
      });
      if(data.Dates.length===0){
        wx.showLoading({
          title: '未放映该电影，请选择其他电影',
          mask: true,
        });
        return;
      }
      data.Dates=data.Dates.map((item)=>{
        item.text=item.text.split(" ").join('');
        return item
      });
      this.setData({
        dateShow:data.DateShow[data.Dates[0].slug],
        selectDate:data.Dates[0].slug,
        cinema:data
      });
      console.log(this.data.dateShow)
    });
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