<template>
  <div class="work_bench">

    <div class="weui-cells__title">审批管理</div>
    <div class="weui-grids" style="background-color: #fcfcfc;">
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">我的申请</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">待我审批</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">抄送我的</div>
      </div>
    </div>


    <div class="weui-cells__title">业务管理</div>
    <div class="weui-grids" style="background-color: #fcfcfc;">
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">我的预约</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">我的客户</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">添加客户</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">项目申报</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">目标申报</div>
      </div>
    </div>


    <div class="weui-cells__title">员工管理</div>
    <div class="weui-grids" style="background-color: #fcfcfc;">
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">员工管理</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">积分奖扣</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">我的日志</div>
      </div>
    </div>



    <div class="weui-cells__title">门店管理</div>
    <div class="weui-grids" style="background-color: #fcfcfc;">
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">美容院制度</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">店内海报</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">岗位管理</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">公告</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">发布任务</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">发布项目</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">积分制度</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">签到设置</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">岗位管理</div>
      </div>
    </div>


    <div class="weui-cells__title">系统管理</div>
    <div class="weui-grids" style="background-color: #fcfcfc;">
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">修改资料</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">修改密码</div>
      </div>
      <div class="weui-grid" hover-class="weui-grid_active">
        <!-- <image class="weui-grid__icon" :src="item.src" /> -->
        <div class="weui-grid__label">签到</div>
      </div>
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
