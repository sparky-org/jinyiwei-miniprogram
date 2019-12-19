import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: 'iview',
    "usingComponents": {
      'i-swipeout': '/static/iview/swipeout/index',
      'i-icon': '/static/iview/icon/index',
      'i-cell': '/static/iview/cell/index'
    }
  }
}
