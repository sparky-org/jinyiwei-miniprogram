<template>
  <div class="staff_index">
      <div class="myinfo" v-if="userInfo">
        <img :src="userInfo.avatarUrl">
        <div>
          <p>{{userInfo.nickName}}<span>{{staffInfo.level}}</span>&#12288;&#12288;&#12288;</p>
          <p>工号：{{staffInfo.id}}<span>积分：{{staffInfo.point}}</span>&#12288;&#12288;&#12288;</p>
        </div>
      </div>

      <div class="weui-cells__title">我的任务</div>
      <div class="weui-cells weui-cells_after-title">
        <navigator v-for="(item, index) in hotList" :key="index" url="/pages/staffTask/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <div class="weui-cell__bd">{{item.name}}</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
        <!-- <navigator url="/pages/staffTask/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <div class="weui-cell__bd">我的任务二</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator> -->
        <navigator class="weui-panel__ft" url="/pages/staffTask/main">
          <div class="weui-cell weui-cell_access weui-cell_link">
            <div class="weui-cell__bd" style="text-align: right;">
              查看更多
            </div>
            <div class="weui-cell__ft weui-cell__ft_in-access"></div>
          </div>
        </navigator>
      </div>

      <div class="weui-cells weui-cells_after-title" style="margin-top: 20rpx;">
        <navigator url="/pages/staffApply/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <div class="weui-cell__bd">我的申请</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
        <navigator url="/pages/staffSign/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <div class="weui-cell__bd">签到赚积分</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
      </div>
      
      <div style="padding: 50rpx 20rpx;">
        <button class="weui-btn" type="primary" @click="handleExit">退出登陆</button>
      </div>

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
    // wx.login({
    //   success: () => {
    //     wx.getUserInfo({
    //       success: (res) => {

    //       }
    //     })
    //   }
    // })
    wx.getUserInfo({
      success: (res) => {
         this.userInfo = res.userInfo
      }
    })
    this.getData();
    this.getNearestTasks()

  },
  data() {
    return {
      // avator: 'https://free.modao.cc/uploads3/images/955/9557238/raw_1494941308.png',
      // userInfo: {
      //    nickName: '邹志辉'
      // },
      userInfo: null,
      staffInfo: null,
      hotList: []
    };
  },
  components: {},
  methods: {
    handleExit(){
      console.info(19012902109)
      wx.clearStorageSync()
      wx.reLaunch({
        url: "/pages/login/main"
      });
    },
    // ...mapMutations(["update"]),

    async getData() {
      const data = await post(`/employ/queryEmployInfo?employId=${this.$store.state.userInfo.employId}`);
      console.info('staff', data)
      if(data.success){
        if(data.result.employId > 0){
          if(String(data.result.employId).length == 1){
            console.info('dsjajdsasdksdallks')
            data.result.employId = '00' + data.result.employId
          }
          if(String(data.result.employId).length == 2){
            data.result.employId = '0' + data.result.employId
          }
        }
        this.staffInfo = data.result
      }


      // this.banner = data.banner;
      // this.channel = data.channel;
      // this.brandList = data.brandList;
      // this.newGoods = data.newGoods;
      // this.hotGoods = data.hotGoods;
      // this.topicList = data.topicList;
      // this.newCategoryList = data.newCategoryList;
    },

    async getNearestTasks() {
      const data = await post(`/agency/task/getNearestTasks?employId=${this.$store.state.userInfo.employId}`);
      console.info('staff', data)
      if(data.success){
        this.hotList = data.result ? data.result : []
      }


      // this.banner = data.banner;
      // this.channel = data.channel;
      // this.brandList = data.brandList;
      // this.newGoods = data.newGoods;
      // this.hotGoods = data.hotGoods;
      // this.topicList = data.topicList;
      // this.newCategoryList = data.newCategoryList;
    }
    // goodsDetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/goods/main?id=" + id
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
