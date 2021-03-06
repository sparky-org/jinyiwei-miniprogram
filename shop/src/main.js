import Vue from 'vue'
import App from './App'

//全局处理重复页面跳转详情初始化,和详情跳详情返回的bug
import MyPlugin from './minxins'
Vue.use(MyPlugin)

import '../static/weui/weui.css'
import '../static/animate.min.css'

// import noData from './components/no-data'
// console.info('noData',noData)
// Vue.component('no-data',noData)


//引入store
import store from './store/index'
//把store挂载到全局
Vue.prototype.$store = store;

Vue.config.productionTip = false
App.mpType = 'app'
// import '../static/weui/weui.css'
// import '../static/weui.css'


const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    "pages": [
      // "pages/feedback/main",
      // "pages/order/main",
      // "pages/cart/main",
      // "pages/mappage/main",
      // "pages/collectlist/main",
      // "pages/addressSelect/main",
      // "pages/addaddress/main",
      // "pages/address/main",


      // "^pages/index/main",
      "^pages/index/main",
      "pages/customer/main",
      "pages/my-task-manage/main",
      "pages/my-application/main",


      // "pages/adminOrder/main",
      // "pages/adminBuy/main",
      // "pages/adminIndex/main",
      // "pages/adminMy/main",
      // "pages/search/main",
      // "pages/login/main",
      // "pages/category/main",
      // "pages/categorylist/main",
      // "pages/topic/main",
      // "pages/goods/main",
      // "pages/logs/main",
      // "pages/branddetail/main",
      // "pages/brandlist/main",
      // "pages/newgoods/main",
      // "pages/practice/main",
      // "pages/topicdetail/main"
    ],

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
              "pagePath": "pages/task/main",
              "iconPath": "static/images/ic_menu_topic_nor.png",
              "selectedIconPath": "static/images/ic_menu_topic_pressed.png",
              "text": "我的任务"
            },
            {
              "pagePath": "pages/customer/main",
              "iconPath": "static/images/ic_menu_sort_nor.png",
              "selectedIconPath": "static/images/ic_menu_sort_pressed.png",
              "text": "我的客户"
            },
            {
              "pagePath": "pages/workBench/main",
              "iconPath": "static/images/ic_menu_me_nor.png",
              "selectedIconPath": "static/images/ic_menu_me_pressed.png",
              "text": "工作台"
            }
          ]
        },
    "window": {
      "backgroundTextStyle": "light",
      "navigationBarBackgroundColor": "#fff",
      "navigationBarTitleText": "俪人管家",
      "navigationBarTextStyle": "black"
    },
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序使用"
      }
    }
  }
}
