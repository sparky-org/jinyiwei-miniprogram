<template>
  <div class="confirm-order">
    <!-- 支付方式 -->
    <ul class="pay-type">
      <h2>支付方式</h2>
      <li>
        <i class="iconfont icon-wx-pay"></i>
        <div class="font">
          <h3>微信支付</h3>
          <p>推荐已在微信中绑定银行卡的用户使用</p>
        </div>
        <div class="radio" @click="choosePayType('WEIXIN')">
          <i class="iconfont icon-checked" v-if="payType === 'WEIXIN'"></i>
          <i class="iconfont icon-not-checked" v-else></i>
        </div>
      </li>
      <li>
        <i class="iconfont icon-wallet"></i>
        <div class="font">
          <h3>钱包支付</h3>
          <p>使用用户钱包支付</p>
        </div>
        <div class="radio" @click="choosePayType('WALLET')">
          <i class="iconfont icon-checked" v-if="payType === 'WALLET'"></i>
          <i class="iconfont icon-not-checked" v-else></i>
        </div>
      </li>
      <li>
        <i class="iconfont icon-integral"></i>
        <div class="font">
          <h3>可用积分{{pointBalance}}分</h3>
        </div>
        <div class="radio" @click="choosePayType('POINT')">
          <i class="iconfont icon-checked" v-if="payType === 'POINT'"></i>
          <i class="iconfont icon-not-checked" v-else></i>
        </div>
      </li>
    </ul>

    <!-- 订单信息 -->
    <div class="order-info">
      <h2>订单信息</h2>
      <div class="goods-info" v-for="(item, index) in info" :key="index">
        <image :src="item.picUrl"/>
        <div class="font">
          <div class="title">{{item.goodsName}}</div>
          <div v-if="item.usePoint" class="price-num">
            <span class="price">{{item.pointPrice}}积分</span>
            <span class="old-price">{{item.retailPrice}}</span>
            <span class="num">x {{item.num}}</span>
          </div>
          <div v-if="!item.usePoint" class="price-num">
            <span class="price">{{item.price}}</span>
            <span class="old-price">{{item.retailPrice}}</span>
            <span class="num">x {{item.num}}</span>
          </div>
        </div>
      </div>
      <div class="total-price">
        <span>支付金额</span>
        <div>共计1件商品 总计：¥{{allprice}}</div>
      </div>
      <div class="remark-panel">
        <span>备注：</span>
        <textarea @input="changeInput($event,'remark')" :value="remark"/>
      </div>
    </div>
    <div class="bottom">
      <div>实付 : ￥{{allprice}}</div>
      <div @click="pay">确认订单</div>
    </div>

    <div class="weui-dialog" v-if="showDialog">
      <div class="weui-mask" @click="closeDialog"></div>
      <div class="weui-dialog__wrp" @click="closeDialog">
        <div class="box">
          <div class="goods-info" v-for="(item, index) in info" :key="index">
            <image :src="item.picUrl"/>
            <div class="font">
              <div class="title">{{item.goodsName}}</div>
              <div v-if="item.usePoint" class="price-num">
                <span class="price">{{item.pointPrice}}</span>
                <span class="old-price">{{item.retailPrice}}</span>
                <span class="num">x {{item.num}}</span>
              </div>
              <div v-if="!item.usePoint" class="price-num">
                <span class="price">{{item.price}}</span>
                <span class="old-price">{{item.retailPrice}}</span>
                <span class="num">x {{item.num}}</span>
              </div>
            </div>
          </div>
          <div class="filter-tip">
            这些商品不支持{{payObj[this.payType]}}，请重新勾选后下单
          </div>
          <div class="primary-btn" @click="closeDialog">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {get, post, login, getStorageOpenid} from "../../utils";
  export default {
    onShow() {
      let {goodsList} = this.$root.$mp.query
      if (goodsList) {
        this.info = JSON.parse(goodsList)
      }
    },
    created() {
    },
    mounted() {
        console.log("pay type is : ", this.payType)
        if (this.payType == 'POINT'){
            this.allprice = this.info.reduce((prev, cur) => {
                prev += parseFloat(cur.pointPrice * cur.num)
                return prev
            }, 0)
        }else{
            this.allprice = this.info.reduce((prev, cur) => {
                prev += parseFloat(cur.price * cur.num)
                return prev
            }, 0)
        }
        this.loadPointBalance();
    },
    data() {
      return {
        userInfo: wx.getStorageSync("userInfo") || {},
        payType: 'WEIXIN',
        payObj: {
          'WEIXIN': '微信支付',
          'WALLET': '钱包支付',
          'POINT': '积分支付'
        },
        allprice: 0,
        remark: '',
        info: [/*{
          num: 1,
          goodsId: 1,
          goodsName: '商品名称啊啊啊',
          price: 123,
          picUrl: 'https://oss.chlpartner.com/distribution/gold/images/index/swiper1.png',
        }*/],
        showDialog: false,
        pointBalance: 0
      };
    },
    components: {},
    methods: {
        loadPointBalance(){
            post(`/customer/getCustomer?customerId=${this.userInfo.customerId}`).then(res=>{
                if (res.success){
                    this.pointBalance = res.result.pointBalance;
                }
            })
        },
      showHelp() {
        this.showDialog = true
      },
      closeDialog() {
        this.showDialog = false
      },
      // 选择支付方式
      choosePayType(value) {
        this.payType = value;
          if (this.payType == 'POINT'){
              console.log("pay type is : ", this.info)
              this.allprice = this.info.reduce((prev, cur) => {
                  prev += parseFloat(cur.pointPrice * cur.num)
                  return prev
              }, 0)
          }else{
              this.allprice = this.info.reduce((prev, cur) => {
                  prev += parseFloat(cur.price * cur.num)
                  return prev
              }, 0)
          }
      },
      changeInput($event, key) {
        this[key] = $event.target.value
      },
      pay() {
        let orderReqDtls = this.info.map(item => {
          return {
            goodsId: item.goodsId,
            count: item.num
          }
        })
        this.filterGoods = this.info.filter(item => !item.payTypeList.includes(this.payType))
        if (this.filterGoods && this.filterGoods.length) {
          this.showDialog = true
          return
        }
        post(`/shop/order/createOrder`, {
          customerId: this.userInfo.customerId,
          desc: this.remark,
          payAmount: this.allprice,
          payType: this.payType,
          shopId: this.globalData.shopId,
          orderReqDtls
        }).then(res => {
          if (this.payType === 'WEIXIN') {
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
          } else {
            wx.showToast({
              title: "订单创建成功",
              icon: "none",
              duration: 1000
            });
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/my/main'
              })
            }, 1000)
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
