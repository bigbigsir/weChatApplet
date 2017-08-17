// select_seat.js
import {requestData1} from '../../../utils/util.js';
Page({

  data: {
    choose: `../../../img/seat-green.png`,
    notChoose: `../../../img/seat-white.png`,
    screening: {},
    showInfo: {},
    seat: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    row: '',
    column: '',
    buyNumLimit:0,
    chooseSeat:[],
    totolPrice:0,
    Price:40,
  },
  chooseRow(e){
    var row = e.currentTarget.dataset.index;
    this.setData({
      row: row,
    });
    console.log(row + '行');
    this.changeSeat();
  },
  chooseColumn(e){
    var column = e.currentTarget.dataset.index;
    this.setData({
      column: column,
    });
    console.log(column + '座');
  },
  changeSeat(){
    this.data.buyNumLimit=0;
    this.data.chooseSeat=[];
    this.data.seat[this.data.row][this.data.column] = this.data.seat[this.data.row][this.data.column]===0?1:0;
      for (var arr of this.data.seat){
        for (var val of arr){
          if (val===1){
            this.data.buyNumLimit++;
          }
        }
      }

    if (this.data.buyNumLimit<=4){
      var count=0;
      for (var arr1 of this.data.seat) {
        count++;
        var count1=0;
        for (var val1 of arr1) {
          count1++;
          if (val1 === 1) {
            this.data.chooseSeat.push(count+'排'+count1+'座');
          }
        }
      }

      this.setData({
        seat:this.data.seat,
        totolPrice:this.data.buyNumLimit*this.data.Price,
        buyNumLimit:this.data.buyNumLimit,
        chooseSeat:this.data.chooseSeat
      });
    }
    else {
      this.data.seat[this.data.row][this.data.column] = 0;
      wx.showToast({
        title: '一次最多购买4张',
        duration: 1000,
        image:'../../../img/err.jpg'
      })
    }
  },
  buyBut(){
    if (this.data.totolPrice){
      wx.showToast({
        title: `总计${this.data.totolPrice}元，购票成功`,
        duration: 1000,
        icon:'success'
      })
    }
  },
  onLoad: function(options) {
    if (options.screening) {
      this.setData({
        screening: JSON.parse(options.screening),
      });
    }
    console.log(this.data.screening);
    //this.data.screening.showid this.data.screening.showdate
    requestData1(
        `http://m.maoyan.com/show/seats?showId=${this.data.screening.showid}&showDate=${this.data.screening.showdate}`,
        (data) => {
          if (data.errMsg) {
            wx.showLoading({
              title: data.errMsg.errMsg,
              mask: true,
            });
          }
          this.setData({
            showInfo: data.showInfo,
          });
          console.log(data);
        });
    wx.setNavigationBarTitle({
      title: this.data.screening.moviename || '　',
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