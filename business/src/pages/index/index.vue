<template>
  <div class="index">
  
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {

    // 判断是否登录
    let userInfo = wx.getStorageSync("userInfo")
    if(!userInfo){
      // console.info(1212)
      wx.reLaunch({
        url: '/pages/login/main'
      })
      return
    }
    // console.info('this.$store',this.$store)
    this.$store.commit('setUserInfo',userInfo)

    if( userInfo.role == "EMPLOY"){
      wx.reLaunch({
        url: '/pages/staffIndex/main'
      })
    }
    // if( userInfo.role == "SADMIN"){
    //   wx.switchTab({
    //     url: '/pages/adminIndex/main'
    //   })
    // }
    if( userInfo.role == "ADMIN"){
      wx.switchTab({
        url: '/pages/adminIndex/main'
      })
    }
    // wx.switchTab({
    //   url: '/pages/adminIndex/main'
    // })

    // let role = 'admin'
    // setTimeout(() => {
    //   if(role === 'admin'){
    //     // 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面  返回是 wx.navigateBack({ })
    //     // wx.navigateTo({
    //     //   url: '/pages/adminIndex/main'
    //     // })

    //     // 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
    //     // wx.redirectTo({
    //     //   url: '/pages/adminIndex/main'
    //     // })

    //     // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    //     // wx.switchTab({
    //     //   url: '/pages/adminIndex/main'
    //     // })

    //     wx.navigateTo({
    //       url: '/pages/login/main'
    //     })
    //   }else{
    //     wx.redirectTo({
    //       url: '/pages/staffIndex/main'
    //     })
    //   }
    // }, 0)
    // this.getData();
  },
  data() {
    return {

    };
  },
  components: {},
  methods: {


    // async getData() {
    //   const data = await get("/index/index");
    //   this.banner = data.banner;
    //   this.channel = data.channel;
    //   this.brandList = data.brandList;
    //   this.newGoods = data.newGoods;
    //   this.hotGoods = data.hotGoods;
    //   this.topicList = data.topicList;
    //   this.newCategoryList = data.newCategoryList;
    // },
    // goodsDetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/goods/main?id=" + id
    //   });
    // },
    // categoryList(id) {
    //   wx.navigateTo({
    //     url: "/pages/categorylist/main?id=" + id
    //   });
    // },
    // goodsList(info) {
    //   if (info == "hot") {
    //     wx.navigateTo({
    //       url: "/pages/newgoods/main?isHot=" + 1
    //     });
    //   } else {
    //     wx.navigateTo({
    //       url: "/pages/newgoods/main?isNew=" + 1
    //     });
    //   }
    // },
    // topicdetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/topicdetail/main?id=" + id
    //   });
    // },
    // totopic() {
    //   wx.navigateTo({
    //     url: "/pages/topic/main"
    //   });
    // },
    // tobrandList() {
    //   wx.navigateTo({
    //     url: "/pages/brandlist/main"
    //   });
    // },
    // branddetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/branddetail/main?id=" + id
    //   });
    // }
  },
  created() {
    // console.log(89128921982189)
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
