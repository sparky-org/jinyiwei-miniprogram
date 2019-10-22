<template>
  <div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell ">
        <div class="weui-cell__hd">
          <div class="weui-label">昵称</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入昵称" :value="nickName" @input="changeInput($event,'nickName')"/>
        </div>
      </div>
      <div class="weui-cell  weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label">详细地址</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入详细地址（5-120个字）" :maxlength="120" :value="address" @input="changeInput($event,'address')"/>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <button class="weui-btn" type="primary" @click="onSubmit">确定</button>
    </div>
  </div>
</template>

<script>
  import Calendar from 'mpvue-calendar'
  import 'mpvue-calendar/src/style.css'
  import {
    get,
    post,
    login,
    getStorageOpenid
  } from "../../utils";
  export default {
    components: {
      Calendar
    },
    data() {
      return {
        userInfo: wx.getStorageSync("userInfo") || {},
        nickName: '',
        address: ''
      };
    },
    onShow() {
      if (login()) {
        this.loadData()
      }
    },
    created() {
    },
    mounted() {

    },
    //下拉刷新
    onPullDownRefresh: function () {
      wx.stopPullDownRefresh()
      this.loadData()
    },
    methods: {
      changeInput ($event, key) {
        this[key] = $event.target.value
      },
      loadData() {
        post(`/customer/getCustomer?customerId=${this.userInfo.customerId}`).then(res => {
          if (res.success) {
            this.nickName = res.result.nickName
            this.address = res.result.address
          }
        })
      },
      onSubmit(articleId) {
        post(`/customer/modifyCustomer`, {
          nickName: this.nickName,
          address: this.address,
          id: this.userInfo.customerId
        }).then(res => {
          if (res.success) {
            wx.showToast({
              title: "修改成功",
              icon: "success",
              duration: 1000
            });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            },1000)
          }
        })
      }
    },
    computed: {

    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";
</style>
