import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: 'iview',
    "usingComponents": {
      // 滑动删除
      'i-swipeout': '/static/iview/swipeout/index',
      'i-icon': '/static/iview/icon/index',
      'i-cell': '/static/iview/cell/index',

      // tab
      // "i-tabs": "/static/iview/tabs/index",
      // "i-tab": "/static/iview/tab/index",

      //通知
      "i-notice-bar": "/static/iview/notice-bar/index",

      //步骤条
      "van-steps": "/static/vant/steps/index",


      // vant tab
      "van-tab": "/static/vant/tab/index",
      "van-tabs": "/static/vant/tabs/index",

      // 折叠面板
      "van-collapse": "/static/vant/collapse/index",
      "van-collapse-item": "/static/vant/collapse-item/index",

      // 错误提示
      "van-notify": "/static/vant/notify/index",

      //Toast 轻提示
      "van-toast": "/static/vant/toast/index",
      
      
      // icon
      "van-icon": "/static/vant/icon/index"

    }
  }
}
