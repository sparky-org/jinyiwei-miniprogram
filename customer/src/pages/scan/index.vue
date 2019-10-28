<template>
  <div class="scan-container">
    <div v-if="isPay">
      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell weui-cell_vcode">
          <view class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入支付金额" :value="amount" @input="changeInput($event,'amount')"/>
          </view>
        </view>
      </view>
      <view class="weui-btn-area">
        <button class="weui-btn" type="primary" @click="pay">支付</button>
      </view>
    </div>
  </div>
</template>

<script>
import { get, post, toLogin, getStorageOpenid } from "../../utils";
import { mapState, mapMutations } from "vuex";
import noData from '@/components/no-data'
export default {
  computed: {
  },
  mounted() {
    
  },
  data() {
    return {
      isLoading: false,
      isPay: false,
      openId: '',
      amount: '',
    };
  },
  components: {
    noData
  },
  onShow() {
    if (toLogin()) {
      this.openId = getStorageOpenid();
      if (!this.isLoading && !this.isPay) {
        setTimeout(() => {
          this.scanCode()
        }, 1)
      }
    }
  },
  onUnload() {
  },
  onHide() {
    if (this.isPay) {
      this.isLoading = false
      this.isPay = false
    }
  },
  onLoad() {
    
  },
  methods: {
    scanCode() {
      let vm = this
      this.isLoading = true
      wx.scanCode({
        onlyFromCamera: false,
        success: (res) => {
          if (res.result == this.globalData.shopId) {
            this.isPay = true
            setTimeout(() => {
              this.isLoading = false
            }, 500)
          } else {
            this.isPay = false
            wx.showModal({
              title: "提示",
              content: "无效商家码",
              success: function (res) {
                if (res.confirm) {
                  setTimeout(() => {
                    vm.isLoading = false
                  }, 500)
                  wx.switchTab({
                    url: '/pages/index/main'
                  })
                } else if (res.cancel) {
                  setTimeout(() => {
                    vm.isLoading = false
                  }, 500)
                  wx.switchTab({
                    url: '/pages/index/main'
                  })
                }
              }
            });
          }
          console.log('扫码成功',res)
        },
        //错误返回
        fail: (res) => {
          this.isPay = false
          console.log('扫码失败')
          setTimeout(() => {
            this.isLoading = false
          }, 500)
          wx.switchTab({
            url: '/pages/index/main'
          })
        },
      })
    },
    changeInput ($event, key) {
      this[key] = $event.target.value
    },
    pay() {
      post(`/shop/order/createPrepaymentPayOrder`, {
          amount: this.amount,
          openId: this.openId
        }).then(res => {
          // 微信支付
          // wx.requestPayment({
          //   ...res.data.payInfo,
          //   'success':function(res){
          //     wx.navigateTo({
          //       url: `/pages/index/market-order-detail/index?isPaySuccess=1&orderId=${orderId}`,
          //     })
          //   },
          //   'fail':function(res){
          //     wx.navigateTo({
          //       url: `/pages/index/market-order-detail/index?orderId=${orderId}`,
          //     })
          //   },
          //   'complete':function(res){
          //   }
          // })
        })
    }
  },
  created() {
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
