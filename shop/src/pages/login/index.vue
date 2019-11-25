<template>
  <div class="login">
    <div class="weui-cells weui-cells_after-title">
      <div class="logo">
        <img :src="logoImg">
      </div>
      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label">手机号</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.phone" @blur="handlePhoneBlur" placeholder="请输入手机号" />
        </div>
        <!-- <div class="weui-cell__ft">
          <div class="weui-vcode-btn" @click="getCode">获取验证码</div>
        </div> -->
      </div>

      <!-- {{form.pwd}} -->

      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label">密&#12288;码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.pwd" placeholder="请输入密码" />
        </div>
        <!-- <div class="weui-cell__ft">
          <image class="weui-vcode-img" src="/static/images/vcode.jpg" style="width: 108px" />
        </div> -->
      </div>

      <!-- {{shopNo}} -->
      <div class="weui-cell weui-cell_select" v-if="shopList.length > 1">
        <div class="weui-cell__hd weui-cell__hd_in-select-after">
          <div class="weui-label">请选择店铺</div>
        </div>
        <div class="weui-cell__bd">
          <picker @change="bindShopChange" :range="shopNameList">
            <div class="weui-select weui-select_in-select-after">{{shopIndex>-1?shopNameList[shopIndex]:''}}</div>
          </picker>
        </div>
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
    // 上线后去掉  测试用
	  // wx.switchTab({
	  //   url: '/pages/index/main'
	  // })
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
      form: {
        phone: '13011111101',
        pwd: '',
      },
      logoImg: require('./logo.png'),
      shopList: [],
      shopIndex: -1,
      shopNameList: [],
      shopNo: null
    };
  },
  watch:{
  },
  components: {},
  methods: {
    async handlePhoneBlur(){
      const data = await post(`/listMyShop?phone=${this.form.phone}`);
      // console.info(data)
      if(data.success){
        if(data.result.length > 1){
          this.shopList = data.result
          this.shopNameList = data.result.map(item => {
            return item.shopName
          })
        }else if(data.result.length == 1){
            this.shopList = data.result
            this.shopNo = data.result[0].shopNo
        }else{
          wx.showModal({
            content: '不存在该用户',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击确定')
              }
            }
          });
        }
      }
    },
    bindShopChange(e) {
      this.shopIndex = e.mp.detail.value;
      this.shopNo = this.shopList[this.shopIndex].shopNo
    },
    // async getCode(){
    //   if(!this.phone){
    //     wx.showModal({
    //       content: '请输入手机号码',
    //       showCancel: false,
    //       success: function (res) {
    //         if (res.confirm) {
    //           // console.log('用户点击确定')
    //         }
    //       }
    //     });
    //     return
    //   }
    //   const data = await post(`/agency/info/getVerifyCode?phone=${this.phone}`);
    //   // console.info(data)
    //   if(data.success){
    //     this.verifyCode = data.result
    //   }
    // },
    async handleLogin(){
      if(!this.form.phone){
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
      if(!this.form.pwd){
        wx.showModal({
          content: '请输入密码',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            }
          }
        });
        return
      }
      if(!this.shopNo){
        wx.showModal({
          content: '请选择店铺',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            }
          }
        });
        return
      }
      const data = await post(`/login`, {
        "phone": this.form.phone,
        "password": this.form.pwd,
        "shopNo": this.shopNo
      });
      if(data.success){
        wx.setStorageSync("userInfo", data.result);
        this.$store.commit('setUserInfo',data.result)
        wx.switchTab({
          url: '/pages/index/main'
        })
        // if( data.result.role == "EMPLOY"){
        //   wx.reLaunch({
        //     url: '/pages/staffIndex/main'
        //   })
        // }
        // if( data.result.role == "SADMIN"){
        //   wx.switchTab({
        //     url: '/pages/adminIndex/main'
        //   })
        // }
        // if( data.result.role == "ADMIN"){
        //   wx.switchTab({
        //     url: '/pages/adminIndex/main'
        //   })
        // }
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
