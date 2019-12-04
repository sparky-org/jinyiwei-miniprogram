<template>
  <div class="work_bench">

    <div class="weui-cells__title">审批管理</div>
    <div class="weui-grids" style="background-color: #fcfcfc;">
      <navigator url="/pages/my-application/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">我的申请</div>
      </navigator>
      <navigator url="/pages/my-approval/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">待我审批</div>
      </navigator>
      <navigator url="/pages/my-copy-me/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">抄送我的</div>
      </navigator>
    </div>


    <div class="weui-cells__title">业务管理</div>
    <div class="weui-grids" style="background-color: #fcfcfc;">
      <navigator url="/pages/my-appointment/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">我的预约</div>
      </navigator>
      <navigator url="/pages/my-appointment-create/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">预约客户</div>
      </navigator>
      <navigator url="/pages/customer-operate/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">添加客户</div>
      </navigator>
      <navigator url="/pages/my-project/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">项目申报</div>
      </navigator>
      <navigator url="/pages/my-target/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">业绩申报</div>
      </navigator>
    </div>


    <div class="weui-cells__title">员工管理</div>
    <div class="weui-grids" style="background-color: #fcfcfc;">
      <navigator url="/pages/my-duty/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">我的考勤</div>
      </navigator>
      <navigator url="/pages/my-staff-manage/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">员工管理</div>
      </navigator>
      <navigator url="/pages/my-score/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">积分榜</div>
      </navigator>
      <navigator url="/pages/my-score-action/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">积分奖扣</div>
      </navigator>
      <navigator url="/pages/my-score-action-record/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">奖扣记录</div>
      </navigator>
      <navigator url="/pages/my-diary/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">我的日志</div>
      </navigator>
    </div>



    <div class="weui-cells__title">门店管理</div>
    <div class="weui-grids" style="background-color: #fcfcfc;">
      <navigator url="/pages/my-shop-rules/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">美容院制度</div>
      </navigator>
      <navigator url="/pages/my-shop-poster/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">店内海报</div>
      </navigator>
      <navigator url="/pages/my-staff-position/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">岗位管理</div>
      </navigator>
      <navigator url="/pages/my-project-manage/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">项目管理</div>
      </navigator>
      <navigator url="/pages/my-shop-notice/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">公告</div>
      </navigator>
      <navigator url="/pages/my-task-operate/main?type=add" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">发布任务</div>
      </navigator>
      <navigator url="/pages/my-task-manage/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">任务管理</div>
      </navigator>
      <!-- <navigator url="" class="weui-grid" hover-class="weui-grid_active"> -->
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <!-- <div class="weui-grid__label">发布项目</div>
      </navigator> -->
      <navigator url="/pages/my-score-rules/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">积分制度</div>
      </navigator>
      <navigator url="/pages/my-duty-set/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">设置考勤</div>
      </navigator>
    </div>


    <div class="weui-cells__title">系统管理</div>
    <div class="weui-grids" style="background-color: #fcfcfc;">
      <!--<navigator url="/pages/my-center/main" class="weui-grid" hover-class="weui-grid_active">-->
        <!--&lt;!&ndash; <image class="weui-grid__icon" :src="item.src" /> &ndash;&gt;-->
        <!--<div class="weui-grid__label">个人中心</div>-->
      <!--</navigator>-->
      <navigator url="/pages/my-center/main?type=edit" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">修改资料</div>
      </navigator>
      <navigator url="/pages/my-change-password/main" class="weui-grid" hover-class="weui-grid_active">
        <!--&lt;!&ndash; <image class="weui-grid__icon" :src="item.src" /> &ndash;&gt;-->
        <div class="weui-grid__label">修改密码</div>
      </navigator>
      <navigator url="/pages/my-sign/main" class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">签到</div>
      </navigator>
    </div>

    <div style="padding: 50rpx 20rpx;">
      <button class="weui-btn" type="warn" @click="handleExit">退出登陆</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";

export default {
  onShow() {
  },
  computed: {

  },
  mounted() {
    // 判断是否登录  ------可以去掉  index 已经写了  测试用
    // let userInfo = wx.getStorageSync("userInfo")
    // if(!userInfo){
    //   wx.reLaunch({
    //     url: '/pages/login/main'
    //   })
    //   return
    // }else{
    //   wx.setStorageSync("userInfo", userInfo);
    //   this.$store.commit('setUserInfo', userInfo)
    // }






    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role)
  },
  data() {
    return {
      role: ''
    };
  },
  components: {},
  methods: {
    // ...mapMutations(["update"]),

    handleExit(){
      wx.clearStorageSync()
      wx.reLaunch({
        url: "/pages/login/main"
      });
    },
    // async getData() {
    //   const data = await get("/index/index");
    //   this.banner = data.banner;
    //   this.channel = data.channel;
    //   this.brandList = data.brandList;
    //   this.newGoods = data.newGoods;
    //   this.hotGoods = data.hotGoods;
    //   this.topicList = data.topicList;
    //   this.newCategoryList = data.newCategoryList;
    // }
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
