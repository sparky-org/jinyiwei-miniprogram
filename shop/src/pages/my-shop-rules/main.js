import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '美容院(店内)制度',
    "usingComponents": {
      // 滑动删除
      'i-swipeout': '/static/iview/swipeout/index',
      'i-icon': '/static/iview/icon/index',
      'i-cell': '/static/iview/cell/index'
    }
  }
}
