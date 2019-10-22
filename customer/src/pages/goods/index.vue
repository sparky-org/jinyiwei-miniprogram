<template>
  <div class="goods">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in info.picUrlList " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>

    <div class="goods-info">
      <p class="title">{{info.goodsName}}</p>
      <div class="desc">
        <span class="price">￥{{info.price}}</span>
        <span class="old-price">￥{{info.retailPrice}}</span>
        <span class="num">已售{{info.boughtCount}}件</span>
      </div>
    </div>

    <ul class="section-nav">
      <li v-for="(item, index) in navList" :key="index" :class="{'active': 
      activeNav == item.value}" @click="changeNav(item)">{{item.text}}</li>
    </ul>
    <div class="detail-panel" v-if="goodsDesc">
      <wxParse :content="goodsDesc"/>
    </div>
    
    <!-- 底部操作 -->
    <div class="bottom-fixed">
      <button open-type="contact" class="contact-btn">
        <div class="collect" :class="[collectFlag ? 'active' :'']">
        </div>
      </button>
      <div @click="toCart" class="cart-btn">
        <div class="car">
          <img src="/static/images/ic_menu_shoping_nor.png" alt="">
        </div>
      </div>
      <div @click="addCart" class="btn add-cart-btn">加入购物车</div>
      <div @click="onBuy" class="btn buy-btn">立即购买</div>
    </div>

  </div>
</template>

<script>
import { get, post, toLogin, login, getStorageOpenid } from "../../utils";
import wxParse from "mpvue-wxparse";

export default {
  onShow() {
    let {id} = this.$root.$mp.query 
    id && this.goodsDetail(id);
  },
  mounted() {
    this.id = this.$root.$mp.query.id;
    this.openId = getStorageOpenid();
  },

  data() {
    return {
      userInfo: wx.getStorageSync("userInfo") || {},
      navList: [{
        value: 1,
        text: '图文详情'
      }, {
        value: 2,
        text: '商品参数'
      }, {
        value: 3,
        text: '购买须知'
      }],
      activeNav: 1,
      goodsDesc: '图文详情',
      info: {/*
        goodsId: 1,
        goodsName: '商品名称啊啊啊',
        price: 123,
        retailPrice: 223,
        boughtCount: 300,
        buyNoticeDesc: '购买须知',
        goodsParamDesc: '商品参数',
        dtlDesc: '图文详情',
        picUrl: 'https://oss.chlpartner.com/distribution/gold/images/index/swiper1.png',
        picUrlList: [
          'https://oss.chlpartner.com/distribution/gold/images/index/swiper1.png',
          'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
          'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        ]*/
      },
    };
  },
  components: {
    wxParse
  },
  methods: {
    // 切换tab
    changeNav(item) {
      this.activeNav = item.value
      if (item.value == 1) {
        this.goodsDesc = this.info.dtlDesc
      } else if (item.value == 2) {
        this.goodsDesc = this.info.goodsParamDesc
      } else {
        this.goodsDesc = this.info.buyNoticeDesc
      }
    },

    // 立即购买
    onBuy() {
      if (toLogin()) {
        let {goodsId, goodsName, picUrl, price, retailPrice} = this.info
        let goodsList = [{
          goodsId, goodsName, picUrl, price, retailPrice, num: 1
        }]
        wx.navigateTo({
          url: `/pages/confirmOrder/main?goodsList=${JSON.stringify(goodsList)}`
        })
      }
    },

    // 加入购物车
    addCart() {
      if (toLogin()) {
        let key = `goodsInfo-${this.userInfo.customerId}`
        let goodsInfo = wx.getStorageSync(key) || []
        wx.showToast({
          title: "添加购物车成功",
          icon: "success",
          duration: 1000
        });
        let findIndex = goodsInfo.findIndex(goods => goods.goodsId == this.info.goodsId)
        if (goodsInfo.length && findIndex !== -1) {
          goodsInfo[findIndex].num = goodsInfo[findIndex].num + 1
          wx.setStorageSync(key, goodsInfo)
          return
        }

        goodsInfo.push({
          ...this.info,
          num: 1
        })
        wx.setStorageSync(key, goodsInfo)
      }
    },

    // 跳转购物车
    toCart() {
      wx.navigateTo({
        url: "/pages/cart/main"
      });
    },

    // 获取商品详情
    goodsDetail(id) {
      post(`/goods/getGoodsDtl?goodsId=${id}`).then(res => {
        if (res.success) {
          this.info = res.result || {}
          this.goodsDesc = res.result ? res.result.dtlDesc : ''
        }
      })
    },
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style.scss";
</style>
