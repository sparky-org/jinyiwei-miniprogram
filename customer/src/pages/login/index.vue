<template>
  <div class="login-container">
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_vcode">
        <view class="weui-cell__bd">
          <input class="weui-input" type="number" placeholder="请输入您的手机号" :value="phone" @input="changeInput($event,'phone')"/>
        </view>
      </view>
      <view class="weui-cell weui-cell_vcode">
        <view class="weui-cell__bd">
          <input class="weui-input" type="number" placeholder="请输入验证码" :value="verifyCode" @input="changeInput($event,'verifyCode')"/>
        </view>
        <view class="weui-cell__ft">
          <view class="weui-vcode-btn" v-if="sendAuthCode" @click="getCode">获取验证码</view>
          <view class="weui-vcode-btn" v-else>{{auth_time}}s后可重新发送</view>
        </view>
      </view>
    </view>
    <view class="weui-btn-area">
      <button class="weui-btn" type="primary" @click="login">登录</button>
    </view>
  </div>
</template>

<script>
import { get, post, getOpenid } from "../../utils";
import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
  },
  mounted() {
  },
  data() {
    return {
      phone: '',
      verifyCode: '',
      sendAuthCode: true,
      auth_time: 0,
    };
  },
  components: {},
  created() {
  },
  methods: {
    changeInput ($event, key) {
      this[key] = $event.target.value
    },
    // 获取验证码
    getCode() {
      if (!this.phone || !/^(1[3|4|5|7|8][0-9]|166|198|199)\d{8}$/.test(this.phone)) {
        wx.showToast({
          title: '请输入正确的手机号',
          mask: true,
          icon: 'none',
          duration: 600
        })
        return
      }
      this.sendAuthCode = false;
      this.auth_time = 60;
      var auth_timetimer =  setInterval(()=>{
          this.auth_time--;
          if(this.auth_time <= 0){
              this.sendAuthCode = true;
              clearInterval(auth_timetimer);
          }
      }, 1000);
      post(`/login/getVerifyCode?phone=${this.phone}`).then(res => {
        if (res.success) {
          wx.showToast({
            title: '验证码发送成功',
            mask: true,
            icon: 'none',
            duration: 600
          })
        }
      })
    },

    // 登录
    login() {
      let {phone, verifyCode} = this
      if (!phone || !/^(1[3|4|5|7|8][0-9]|166|198|199)\d{8}$/.test(phone)) {
        wx.showToast({
          title: '请输入正确的手机号',
          mask: true,
          icon: 'none',
          duration: 600
        })
        return
      }
      if (!verifyCode || !/^\d{4}$/.test(verifyCode)) {
        wx.showToast({
          title: '请输入正确的验证码',
          mask: true,
          icon: 'none',
          duration: 600
        })
        return
      }
      post(`/login/login`, {
        phone,
        verifyCode,
        shopId: this.globalData.shopId
      }).then(res => {
        if (res.success) {
          wx.setStorageSync('userInfo', res.result)
          //获取openid
          if (!wx.getStorageSync('openid')) {
            getOpenid();
          }
          wx.switchTab({
            url: '/pages/index/main'
          })
        }
      })
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
