function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("/");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  return `${t1} ${t2}`;
}

//-------------------------------------------------------------------------请求的封装

// const host = "http://118.25.222.68:5757/heyushuo"
// const host = 'https://www.zjliren520.com/liren-admin'
const host = "http://118.25.104.232:8088/liren-admin"
export { host };

export function msToDate(_ms, _format) {
  let ms = _ms
  let format = _format
  if (ms && ms.toString().length === 10) {
    ms *= 1000
  }
  format = format || 'yyyy-MM-dd hh:mm:ss'
  const d = new Date(ms)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hour = d.getHours()
  const minute = d.getMinutes()
  const seconds = d.getSeconds()

  const addPrefix = source => (source < 10 ? `0${source}` : source)

  format = format.replace('yyyy', year)
    .replace('MM', addPrefix(month))
    .replace('dd', addPrefix(day))
    .replace('hh', addPrefix(hour))
    .replace('mm', addPrefix(minute))
    .replace('ss', addPrefix(seconds))
  return format
}


// import store from './../store'
// console.info('store',store)
// if(userInfo){
//   store.commit('setUserInfo',userInfo)
// }
//请求封装
function request(url, method, data, header = {}) {
  let userInfo = wx.getStorageSync("userInfo")
  console.info('userInfo999',userInfo)
  wx.showLoading({
    title: "加载中" //数据请求前loading
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        "content-type": "application/json", // 默认值
        "token": userInfo ? userInfo.token : ''
        // "key": userInfo ? 'AGENCY-'+userInfo.id : '',
      },
      success: function(res) {
        wx.hideLoading();
        if(res.data.success === false){
          // wx.navigateTo({
          //   url: '/pages/login/main'
          // })
          wx.showModal({
            content: res.data.errMsg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击确定')
              }
            }
          });
        }else{
          console.info('error4-------401',res)
          if(res.statusCode == 401){
            wx.clearStorageSync()
            wx.reLaunch({
              url: "/pages/login/main"
            });
          }
          resolve(res.data);
        }
      },
      fail: function(error) {
        console.info('error1',error)
        if(error.statusCode == 401){
          wx.clearStorageSync()
          wx.reLaunch({
            url: "/pages/login/main"
          });
        }
        wx.hideLoading();
        reject(false);
      },
      complete: function(error) {
        console.info('error2---------401',error)
        if(error.statusCode == 401){
          wx.clearStorageSync()
          wx.reLaunch({
            url: "/pages/login/main"
          });
        }
        wx.hideLoading();
      }
    });
  });
}
export function get(url, data) {
  return request(url, "GET", data);
}
export function post(url, data) {
  return request(url, "POST", data);
}

//-------------------------------------------------------------------------请求的封装

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------

export function toLogin() {
  const userInfo = wx.getStorageSync("userInfo");
  if (!userInfo) {
    wx.navigateTo({
      url: "/pages/login/main"
    });
  } else {
    return true;
  }
}

export function login() {
  const userInfo = wx.getStorageSync("userInfo");
  if (userInfo) {
    return userInfo;
  }
}

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------

export function getStorageOpenid() {
  const openId = wx.getStorageSync("openId");
  if (openId) {
    return openId;
  } else {
    return "";
  }
}

export function getOpenid() {
  // wx.login({
  //   success: res => {
  //     if (res.code) {
  //       //发起网络请求
  //       wx.request({
  //         url: 'https://api.weixin.qq.com/sns/jscode2session',
  //         data: {
  //           "appid": "wx601ce71bde7b9add",
  //           "secret": "abed5421d88eb8236e933c6e42d5c14e",
  //           "js_code": res.code,
  //           "grant_type": "authorization_code"
  //         },
  //         success: function (data) {
  //           var openid = data.data.openid;
  //           wx.setStorageSync("openid", openid);
  //         }
  //       })
  //     } else {
  //       console.log('登录失败！' + res.errMsg)
  //     }
  //   },
  //   fail: () => {},
  //   complete: () => {}
  // });
}

export function queryParams(param, key, encode) {
  if (param==null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '='  + ((encode==null||encode) ? encodeURIComponent(param) : param);
  } else {
      for (var i in param) {
          var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
          paramStr += queryParams(param[i], k, encode)
      }
  }
  return paramStr;
}
