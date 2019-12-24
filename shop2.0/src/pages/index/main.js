import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    "enablePullDownRefresh": true,
    "usingComponents": {
      //通知
      "i-notice-bar": "/static/iview/notice-bar/index"
    }
  }
}
