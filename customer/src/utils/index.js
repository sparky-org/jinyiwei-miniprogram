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

const host = "http://118.25.104.232:8082/jinyiwei-front"
export { host };
//请求封装
function request(url, method, data, header = {}) {
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
        'token': wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').token : '',
        'key': wx.getStorageSync('userInfo') ? 'CUSTOMER-' + wx.getStorageSync('userInfo').customerId : '',
      },
      success: function(res) {
        wx.hideLoading();
        if (!res.data.success) {
          wx.showToast({
            title: res.data.errMsg || '请求失败',
            icon: 'none'
          })
          reject(false);
          return
        }
        console.log(1111, res.data)
        resolve(res.data);
      },
      fail: function(error) {
        console.log('fail', error)
        const message = error.errMsg || error.info || '请求失败'
        wx.showToast({
          title: message,
          icon: 'none'
        })
        wx.hideLoading();
        reject(false);
      },
      complete: function(data) {
        console.log('complete', data)
        wx.hideLoading();
        if (data.statusCode !== 200) {
          const message = data.data ? data.data.message : '请求失败'
          wx.showToast({
            title: message,
            icon: 'none'
          })
        }
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
  wx.login({
    success: res => {
      if (res.code) {
        //发起网络请求
        post(`/customer/getUserInfo?customerId=${wx.getStorageSync('userInfo').customerId}&code=${res.code}`).then(res => {
          wx.setStorageSync("openid", openid);
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    },
    fail: () => {},
    complete: () => {}
  });
}

export function wxGetUserInfo(callback) {
  wx.getSetting({
    success: res => {
      let isAuthSetting = res.authSetting['scope.userInfo']
      /**
       * isAuthSetting判断是否授权用户信息，来创建或更新用户信息
       * 已经授权的直接获取
       * 未授权的跳转授权页面
       */
      if (isAuthSetting) {
        wx.getUserInfo({
          success: res => {
            wx.setStorageSync('wxInfo', res.userInfo)
            callback(res.userInfo)
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            // if (this.userInfoReadyCallback) {
            //   this.userInfoReadyCallback(res)
            // }
          }
        })
      } else {
        setTimeout(function() {
          wx.redirectTo({
            url: "/pages/authorize/main"
          })
        }, 100)
      }
    }
  })
}
