function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' +
      [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

function requestData(url,cb) {
  wx.request({
    url:url,
    header: {
      'content-type': 'application/xml'
    },
    success: function(res) {
      cb(res.data.data)
    }
  })
}

function requestData1(url,cb) {
  wx.request({
    url:url,
    header: {
      'content-type': 'application/xml'
    },
    success: function(res) {
      cb(res.data)
    }
  })
}

module.exports = {
  formatTime: formatTime,
  requestData:requestData,
  requestData1:requestData1
};


