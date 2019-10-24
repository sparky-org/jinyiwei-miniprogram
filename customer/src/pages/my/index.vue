<template>
  <div class="my-container">
    <button class="userinfo-btn" open-type="getUserInfo" @getuserinfo="onGotUserInfo">
      <div class='userinfo'>
        <img class="userinfo-avatar" :src="wxInfo.avatarUrl" mode="cover" v-if="wxInfo">
        <div v-else class="userinfo-avatar">
          <span>获取微信头像</span>
        </div>
        <div class="font">
          <div class="userinfo-nickname">{{info.nickName || wxInfo.nickName || '-'}}</div>
          <div class="level-text" v-if="info.vipLevel">{{info.vipLevel}}</div>
        </div>
      </div>
    </button>
    <div @click="logout" class="logout">退出</div>
    <div class="head">
      <div class="item">
        <div class='number' @click="showCashBalance">{{cashBalance}}</div>
        <div class='text'>钱包</div>
      </div>
      <div class="item" @click='getIncome'>
        <div class='number'>{{info.profitBalance}}</div>
        <div class='text'>分红</div>
      </div>
      <div class="item">
        <div class='number'>{{info.pointBalance}}</div>
        <div class='text'>积分</div>
      </div>
    </div>
    <div class="market-contain">
      <div class="title">
        <div class="name">我的订单</div>
        <div class="view-all" @click="goToOrder('/pages/order/main')">查看全部</div>
        <image class="right-inco" src="https://oss.chlpartner.com/distribution/gold/images/my/icon-right.jpg" mode="cover" />
      </div>
      <div class="status-list">
        <div class="item" v-for="(item, index) in statusLists" :key="index" @click="goToOrder('/pages/order/main', item.status)">
          <i class="iconfont" :class="item.icon"></i>
          <div class="name">{{item.name}}</div>
        </div>
      </div>
    </div>
    <ul class="tab-list">
      <li @click="goTo(`/pages/giftCard/main`)" class="item">
        <i class="iconfont icon-gift-card"></i>
        <div class='text'>礼品卡</div>
        <i class="iconfont icon-arrow-right"></i>
      </li>
      <li @click="goTo(`/pages/upgrade/main?vipLevel=${info.vipLevel}&pointBalance=${info.pointBalance}`)" class="item">
        <i class="iconfont icon-upgrade"></i>
        <div class='text'>我要升级</div>
        <i class="iconfont icon-arrow-right"></i>
      </li>
      <li @click="goToAddressList">
        <button open-type="contact" class="item">
          <i class="iconfont icon-customer-service"></i>
          <div class='text'>在线客服</div>
          <i class="iconfont icon-arrow-right"></i>
        </button>
      </li>
      <li @click="goTo('/pages/settings/main')" class="item">
        <i class="iconfont icon-setup"></i>
        <div class='text'>个人设置</div>
        <i class="iconfont icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    get,
    toLogin,
    login,
    post
  } from "../../utils";
  export default {
    onShow() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      if (toLogin()) {
        this.userInfo = wx.getStorageSync("userInfo") || ''
        this.getUserInfo()
      }
    },
    created() {},
    mounted() {},
    data() {
      return {
        wxInfo: wx.getStorageSync("wxInfo") || '',
        userInfo: wx.getStorageSync("userInfo") || '',
        info: {},
        statusLists: [{
          name: '待付款',
          icon: 'icon-pending',
          status: 'NEW'
        }, {
          name: '进行中',
          icon: 'icon-progress',
          status: 'SERVICE'
        }, {
          name: '已完成',
          icon: 'icon-complete',
          status: 'FINISH'
        }],
        cashBalance: '***'
      };
    },
    components: {},
    methods: {
      getUserInfo() {
        post(`/customer/getCustomerCenterInfo?customerId=${this.userInfo.customerId}`).then(res => {
          if (res.success) {
            this.info = res.result || []
          }
        })
      },
      // 获取用户头像信息
      onGotUserInfo: function (e) {
        this.wxInfo = e.target.userInfo
        wx.setStorageSync('wxInfo', e.target.userInfo)
      },
      // 跳转
      goTo(url) {
        if (toLogin()) {
          wx.navigateTo({
            url: url
          });
        }
      },
      goToOrder(url, value) {
        if (toLogin()) {
          wx.navigateTo({
            url: value ? url + `?status=${value}` : url
          });
        }
      },
      // 显示金额
      showCashBalance() {
        this.cashBalance = this.info.cashBalance
      },
      logout() {
        wx.setStorageSync("userInfo", '');
        wx.showToast({
          title: "退出成功",
          icon: "none",
          duration: 1000
        });
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/main'
          })
        }, 1000)
      },
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
