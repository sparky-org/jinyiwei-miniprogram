<template>
  <view class="authorize-container">
      <image class="logo" src="/static/images/wx.png" mode="widthFix" />
      <view class="title">微信授权页面</view>
      <view class="profile">授权并同意使用微信账号登录当前小程序</view>
      <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" class="weui-btn mini-btn">授权登录</button>
  </view>
</template>

<script>
  import {
    get,
    post,
    toLogin,
    getStorageOpenid
  } from "../../utils";
  export default {
    onShow() {},
    created() {},
    data() {
      return {
        
      };
    },
    components: {},
    methods: {
      getUserInfo(e) {
        if (!e.mp.detail.userInfo) {
          return;
        }
        wx.setStorageSync('wxInfo', e.mp.detail.userInfo)
        wx.navigateBack({
          delta: 1
        })
      }
    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";
</style>
