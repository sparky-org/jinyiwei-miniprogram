import Vue from 'vue'
import App from './App'

//全局处理重复页面跳转详情初始化,和详情跳详情返回的bug
import MyPlugin from './minxins'
Vue.use(MyPlugin)

import '../static/weui/weui.css'


//引入store
import store from './store/index'
//把store挂载到全局
Vue.prototype.$store = store;
Vue.prototype.globalData = {
  shopId: 1
}

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    "pages": [
      "pages/order/main",
      "pages/cart/main",
      "^pages/index/main",
      "pages/giftCard/main",
      "pages/articleDetail/main",
      "pages/market/main",
      "pages/my/main",
      "pages/scan/main",
      "pages/login/main",
      "pages/goods/main",
      "pages/appointment/main",
      "pages/settings/main",
      "pages/message/main",
      "pages/upgrade/main",
      "pages/logs/main",
    ],
    "subPackages": [],
    "window": {
      "backgroundTextStyle": "light",
      "navigationBarBackgroundColor": "#fff",
      "navigationBarTitleText": "顾客小程序",
      "navigationBarTextStyle": "black"
    },
    "tabBar": {
      "backgroundColor": "#fafafa",
      "borderStyle": "white",
      "selectedColor": "#b4282d",
      "color": "#666",
      "list": [{
          "pagePath": "pages/index/main",
          "iconPath": "static/images/ic_menu_choice_nor.png",
          "selectedIconPath": "static/images/ic_menu_choice_pressed.png",
          "text": "首页"
        },
        {
          "pagePath": "pages/market/main",
          "iconPath": "static/images/ic_menu_shoping_nor.png",
          "selectedIconPath": "static/images/ic_menu_shoping_pressed.png",
          "text": "积分商城"
        },
        {
          "pagePath": "pages/scan/main",
          "iconPath": "static/images/ic_menu_code_nor.png",
          "selectedIconPath": "static/images/ic_menu_code_pressed.png",
          "text": "扫码支付"
        },
        {
          "pagePath": "pages/appointment/main",
          "iconPath": "static/images/ic_menu_phone_nor.png",
          "selectedIconPath": "static/images/ic_menu_phone_pressed.png",
          "text": "预约"
        },
        {
          "pagePath": "pages/my/main",
          "iconPath": "static/images/ic_menu_me_nor.png",
          "selectedIconPath": "static/images/ic_menu_me_pressed.png",
          "text": "个人中心"
        }
      ]
    },
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序学习使用"
      }
    }
  }
}
