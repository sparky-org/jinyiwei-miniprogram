import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: 'index-bar',
    "usingComponents": {
      "van-index-bar": "/static/vant/index-bar/index",
      "van-index-anchor": "/static/vant/index-anchor/index",
      "van-cell": "/static/vant/cell/index"
    }
  }
}
