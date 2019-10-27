<template>
  <div class="card-container">
    <!-- 页面内容 -->
    <div class='list-contain'>
      <div v-if="cardList && cardList.length">
        <div v-for="(item, index) in cardList" :key="index">
          <div class="market-item">
            <div class='order-code-contain'>
              <div class="order-code">{{item.gmtCreate}}</div>
              <div class="order-status">{{item.statusText}}</div>
            </div>
            <div class="goods-item">
              <div class="order-img-contain">
                <img :src="item.iconUrl" />
              </div>
              <div class="flex-1 detail-info">
                <div class="title">{{item.name || '礼品卡'}}</div>
                <div class='price'>价值：{{item.price}} 元</div>
                <div class='time'>有效期：{{item.endDate}} 前使用</div>
              </div>
            </div>
            <div>
              <div class='group-btns'>
                <div v-if="used" class="status">已消费</div>
                <div v-if="canUse" class="btn primary-btn" @click="use(item.id)">使用</div>
                <button v-if="!used" open-type='share' bindtap="onShareAppMessage" class="btn primary-btn" @click="send(item.id)">赠送</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <no-data v-else></no-data>
    </div>
    <div class="weui-dialog" v-if="showCode">
      <div class="weui-mask" @click="closeDialog"></div>
      <div class="weui-dialog__wrp" @click="closeDialog">
          <img :src="codeImg">
          <p>请店家扫描二维码使用</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {get, post, toLogin, getStorageOpenid} from "../../utils";
  import noData from '@/components/no-data'
  export default {
    onShow() {
      let {status} = this.$root.$mp.query
      if (toLogin()) {
        this.activeNav = status || this.activeNav
        this.userInfo = wx.getStorageSync("userInfo") || {}
        this.loadData()
      }
    },
    created() {},
    mounted() {},
    data() {
      return {
        userInfo: wx.getStorageSync("userInfo") || {},
        cardList: [{
          "beginDate": "2019-10-19T15:51:55.771Z",
          "count": 0,
          "creator": "string",
          "endDate": "2019-10-19T15:51:55.771Z",
          "gmtCreate": "2019-10-19T15:51:55.771Z",
          "gmtModify": "2019-10-19T15:51:55.771Z",
          "id": 1,
          "ownerId": 0,
          "price": 0,
          "shopId": 0
        }],
        showCode: false,
        codeImg: ''
      };
    },
    components: {
      noData
    },
    //下拉刷新
    onPullDownRefresh: function () {
      wx.stopPullDownRefresh()
      this.loadData()
    },
    methods: {
      // 赠送
      send(cardId) {
        let vm =this;
        return {
          title: '顾客小程序',
          path: `/pages/login/main?cardId=${cardId}`,
          success: (res)=>{
            console.log('分享成功', res)
          },
          fail: function (res) {
            // 分享失败
            console.log(res)
          }
        }
      },
      // 使用
      use(gistCouponId) {
        post(`/customer/getCouponUrl?gistCouponId=${gistCouponId}`).then((res) => {
          if (res.success) {
            this.showCode = true
            this.codeImg = res.result
          }
        })
      },
      closeDialog() {
        this.showCode = false
      },
      // 加载数据
      loadData() {
        post(`/customer/getGistCoupons?customerId=${this.userInfo.customerId}`).then((res) => {
          if (res.success) {
            console.log(res.result)
            this.cardList = res.result
          }
        })
      },
    },
    computed: {

    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";
</style>
