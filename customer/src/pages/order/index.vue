<template>
  <div class="order-container">
    <scroll-view scroll-x="true" class="nav-list" :scroll-with-animation="true">
      <block v-for="(item, index) in navData" :key="index">
        <view class="item" :class="{'active': activeNav == item.value}" @click="changeNav(item)">{{item.name}}</view>
      </block>
    </scroll-view>
    <!-- 页面内容 -->
    <div class='list-contain'>
      <div v-if="orderList && orderList.length">
        <div v-for="(item, index) in orderList" :key="index" @click="goToOrderDetail">
          <div class="market-item">
            <div class='order-code-contain'>
              <div class="order-code">订单编号: {{item.orderId}}</div>
              <div class="order-status">{{item.statusText}}</div>
            </div>
            <div class="goods-item" v-for="(it, i) in item.productList" :key="i">
              <div class="order-img-contain">
                <image :src="it.picUrl" />
              </div>
              <div class="flex-1 detail-info">
                <div class="title">{{it.name}}</div>
                <div class="price-num">
                  <div class='real-price'>¥{{it.price}}</div>
                  <div class='number'>X{{it.count}}</div>
                </div>
              </div>
            </div>
            <div class='text-contain'>
              <div class="text">共计{{item.totalCount}}件商品 总计：</div>
              <div class="text-price">¥{{item.orderAmount}}</div>
            </div>
            <div v-if="item.status === 'NEW'">
              <div class='group-btns'>
                <div class="btn primary-btn" @click="payNow(item.orderId)">去支付</div>
              </div>
            </div>
          </div>
        </div>
        <div class="no-more" v-if="orderList.length >= pageCount">没有更多了</div>
      </div>
      <no-data v-else></no-data>
    </div>
  </div>
</template>

<script>
  const statusList = [{
    name: '待付款',
    value: 'NEW'
  }, {
    name: '进行中',
    value: 'SERVICE'
  }, {
    name: '已完成',
    value: 'FINISH'
  }]
  import {
    get,
    post,
    toLogin,
    getStorageOpenid
  } from "../../utils";
  import noData from '@/components/no-data'
  export default {
    onShow() {
      let {status} = this.$root.$mp.query
      if (toLogin()) {
        this.activeNav = status || this.activeNav
        this.loadData()
      } else {
        this.userInfo = wx.getStorageSync("userInfo") || ''
      }
    },
    created() {
    },
    mounted() {
    },
    data() {
      return {
        userInfo: wx.getStorageSync("userInfo") || {},
        orderList: [/*{
          "orderAmount": 200,
          "orderId": 332325660,
          "orderTime": "2019-10-15T15:06:40.008Z",
          "productList": [
            {
              "count": 2,
              "name": "名称啊啊啊",
              "picUrl": "https://oss.chlpartner.com/distribution/gold/images/index/swiper1.png",
              "price": 100
            }
          ],
          "status": "string",
          "totalCount": 2
        }*/],
        activeNav: 'NEW',
        navData: statusList,
        navDataObj: statusList.reduce((prev, cur) => {
          prev[cur.value] = cur.name
          return prev
        }, {}),
        pageNum: 1, //当前页
        pageSize: 10,
        pageCount: null, //总条数
      };
    },
    components: {
      noData
    },
    //上拉加载
    onReachBottom() {
      if(this.orderList.length < this.pageCount) {
        this.loadData(true)
      }
    },
    //下拉刷新
    onPullDownRefresh: function () {
      wx.stopPullDownRefresh()
      this.loadData()
    },
    methods: {
      // 切换状态
      changeNav(item) {
        this.activeNav = item.value
        this.loadData(false)
      },
      //加载数据
      loadData: function (append) {
        let {pageNum, pageSize, activeNav, orderList} = this
        post(`/customer/getServiceOrder?customerId=${this.userInfo.customerId}&status=${activeNav}&currentPage=${append ? pageNum + 1 : 1}&pageSize=${pageSize}`).then((res) => {
          let orders = res.result || []
          orders.map(order => {
            order.statusText = this.navDataObj[order.status]
          })
          this.pageNum = append ? pageNum + 1 : 1
          this.pageCount = res.totalCount
          this.orderList = append ? orderList.concat(orders) : orders
        })
      },
      payNow(orderId) {
        post(`/shop/order/createTransPayOrder`, {
          orderId,
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
      },
    },
    computed: {

    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";
</style>
