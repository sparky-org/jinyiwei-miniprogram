<template>
  <div class="login">
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label">手机号</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="phone" placeholder="请输入手机号" />
        </div>
        <div class="weui-cell__ft">
          <div class="weui-vcode-btn" @click="getCode">获取验证码</div>
        </div>
      </div>

      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label">验证码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="verifyCode" placeholder="请输入验证码" />
        </div>
        <!-- <div class="weui-cell__ft">
          <image class="weui-vcode-img" src="/static/images/vcode.jpg" style="width: 108px" />
        </div> -->
      </div>
    </div>
    <div style="padding: 50rpx 20rpx;">
      <button class="weui-btn" type="primary" @click="handleLogin" :disabled="loginState">登 录</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
import { agentId } from "../../config";
import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    // ...mapState(["cityName"]),
    // loginState(){
    //   return this.phone && this.verifyCode
    // }
  },
  mounted() {
    // this.getData();
  },
  data() {
    return {
      // date: '2019-08-11',
      phone: '15000000001',
      verifyCode: ''
    };
  },
  watch:{

  },
  components: {},
  methods: {

    async getCode(){
      if(!this.phone){
        wx.showModal({
          content: '请输入手机号码',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            }
          }
        });
        return
      }
      const data = await post(`/agency/info/getVerifyCode?phone=${this.phone}`);
      // console.info(data)
      if(data.success){
        this.verifyCode = data.result
      }
    },
    async handleLogin(){
      if(!this.phone){
        wx.showModal({
          content: '请输入手机号码',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            }
          }
        });
        return
      }
      if(!this.verifyCode){
        wx.showModal({
          content: '请输入验证码',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            }
          }
        });
        return
      }
      const data = await post(`/agency/info/login`, {
        "agencyId": agentId,
        "phone": this.phone,
        "verifyCode": this.verifyCode
      });
      if(data.success){
        wx.setStorageSync("userInfo", data.result);
        this.$store.commit('setUserInfo',data.result)
        if( data.result.role == "EMPLOY"){
          wx.reLaunch({
            url: '/pages/staffIndex/main'
          })
        }
        if( data.result.role == "SADMIN"){
          wx.switchTab({
            url: '/pages/adminIndex/main'
          })
        }
        if( data.result.role == "ADMIN"){
          wx.switchTab({
            url: '/pages/adminIndex/main'
          })
        }
        wx.switchTab({
          url: '/pages/adminIndex/main'
        })
      }
    },
    // bindDateChange(e) {
    //   console.log('选中的日期为：' + e.mp.detail.value);
    //   this.date = e.mp.detail.value
    // },
    // ...mapMutations(["update"]),

    // async getData() {
      // const data = await get("/index/index");
      // this.banner = data.banner;
      // this.channel = data.channel;
      // this.brandList = data.brandList;
      // this.newGoods = data.newGoods;
      // this.hotGoods = data.hotGoods;
      // this.topicList = data.topicList;
      // this.newCategoryList = data.newCategoryList;
    // },
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
