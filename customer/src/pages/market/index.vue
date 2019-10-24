<template>
  <div class="market-container">
    <div class="swiper" v-if="banner && banner.length">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.picUrl" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>

    <scroll-view scroll-x="true" class="scroll-list" :scroll-with-animation="true">
      <div class="nav-list">
        <block v-for="(item, index) in navData" :key="index">
          <view class="item" :class="{'active': activeNav == item.categoryId}" @click="changeNav(item)">{{item.name}}</view>
        </block>
      </div>
    </scroll-view>

    <div class="weui-panel article-list" v-if="goodsList && goodsList.length">
      <div class="weui-panel__bd" v-for="(item, index) in goodsList" :key="index" @click="viewDetail(item.goodsId)">
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="item.picUrl" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="title">
              <div class="weui-media-box__title_custom">{{item.goodsName}}</div>
              <div class="num">已售12件</div>
            </div>
            <div class="weui-media-box__desc">
              <span class="price">¥{{item.price}}</span>
              <span class="old-price">¥{{item.retailPrice}}</span>
              <span class="btns">
                <button class="add-cart-btn" @click.stop="addCart(item)">加入购物车</button>
                <button class="buy-btn" @click.stop="onBuy(item)">立即购买</button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="no-more" v-if="goodsList.length >= pageCount">没有更多了</div>
    </div>
    <no-data v-else></no-data>
    <image src="/static/images/circle-cart.png" @click="gotoCart" class="circle-cart"/>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, toLogin } from "../../utils";
import { mapState, mapMutations } from "vuex";
import noData from '@/components/no-data'
export default {
  onShow() {
    this.getData();
  },
  computed: {
    ...mapState(["cityName"])
  },
  mounted() {
  },
  data() {
    return {
      userInfo: wx.getStorageSync("userInfo") || {},
      banner: [
        /*'https://oss.chlpartner.com/distribution/gold/images/index/swiper1.png',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'*/
      ],
      activeNav: '',
      goodsList: [/*{
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
        ]
      }*/],
      navData: [/*{
        name: '推荐',
        categoryId: '1'
      }, {
        name: '美容',
        categoryId: '2'
      }, {
        name: '美体',
        categoryId: '3'
      }, {
        name: '丰胸',
        categoryId: '4'
      }, {
        name: '美白',
        categoryId: '5'
      }, {
        name: '整形',
        categoryId: '6'
      }, {
        name: '微整',
        categoryId: '7'
      }*/],
      pageNum: 1,
      pageSize: 10,
      pageCount: 0
    };
  },
  components: {
    noData
  },
  methods: {
    ...mapMutations(["update"]),

    getData() {
      post(`/commPoster/getPoster?funcPage=MIMAIN&sysCode=CUSTOMER&userId=${this.globalData.shopId}`).then(res => {
        if (res.success) {
          this.banner = res.result || []
        }
      })

      post(`/category/getCategory?shopId=${this.globalData.shopId}&categoryType=GOODS`).then(res => {
        if (res.success) {
          this.navData = res.result
          if (res.result && res.result.length) {
            this.activeNav = res.result[0].categoryId
            this.getItemsList()
          }
        }
      })
    },

    //跳转购物车
    gotoCart: function(e) {
      wx.navigateTo({
        url: "/pages/cart/main"
      })
    },

    // 切换类别
    changeNav(item) {
      this.activeNav = item.categoryId
      this.getItemsList()
    },

    //加载数据
    getItemsList (append) {
      let {pageNum, pageSize, goodsList, activeNav} = this
      let {shopId} = this.globalData
      let params = {
        currentPage: append ? pageNum + 1 : 1,
        data: {
          categoryId: activeNav,
          shopId: this.globalData.shopId
        },
        pageSize: pageSize,
        end: 0,
        start: 0,
        total: 0
      }
      post(`/goods/getGoods`, params).then(res => {
        this.pageNum = append ? pageNum + 1 : 1
        this.pageCount = res.totalCount
        this.goodsList = append ? goodsList.concat((res.result) || []) : (res.result || [])
      })
    },

    // 查看商品详情
    viewDetail(id) {
      wx.navigateTo({
        url: `/pages/goods/main?id=${id}`
      });
    },

    addCart(item) {
      if (toLogin()) {
        let key = `goodsInfo-${this.userInfo.customerId}`
        let goodsInfo = wx.getStorageSync(key) || []
        wx.showToast({
          title: "添加购物车成功",
          icon: "success",
          duration: 1000
        });
        let findIndex = goodsInfo.findIndex(goods => goods.goodsId == item.goodsId)
        if (goodsInfo.length && findIndex !== -1) {
          goodsInfo[findIndex].num = goodsInfo[findIndex].num + 1
          wx.setStorageSync(key, goodsInfo)
          return
        }

        goodsInfo.push({
          ...item,
          num: 1
        })
        wx.setStorageSync(key, goodsInfo)
      }
    },

    // 立即购买
    onBuy(item) {
      if (toLogin()) {
        let {goodsId, goodsName, picUrl, price, retailPrice, payTypeList} = item
        let goodsList = [{
          goodsId, goodsName, picUrl, price, retailPrice, num: 1, payTypeList
        }]
        wx.navigateTo({
          url: `/pages/confirmOrder/main?goodsList=${JSON.stringify(goodsList)}`
        })
      }
    },
  },
  //上拉加载
  onReachBottom() {
    if(this.goodsList.length < this.pageCount) {
      this.getItemsList(true)
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
    this.getItemsList()
  },
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
