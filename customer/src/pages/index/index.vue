<template>
  <div class="index-container">
    <div class="swiper" v-if="banner && banner.length">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.picUrl" class="slide-image" @click="onSwiper(item)"/>
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

    <div class="weui-panel article-list" v-if="articleList && articleList.length">
      <div class="weui-panel__bd" v-for="(item, index) in articleList" :key="index" @click="viewDetail(item.articleId)">
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title_custom">{{item.briefAbstract}}</div>
            <div class="weui-media-box__desc">{{item.publishTime}}
              <span class="view-num">
                <image src="/static/images/icon-view.png"></image>
                <span class="num">{{item.viewCount}}</span>
              </span>
            </div>
          </div>
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="item.picUrl" />
          </div>
        </div>
      </div>
    </div>
    <no-data v-else></no-data>
  </div>
</template>

<script>
import { get, post } from "../../utils";
import { mapState, mapMutations } from "vuex";
import noData from '@/components/no-data'
export default {
  computed: {
    ...mapState(["cityName"])
  },
  mounted() {
    
  },
  data() {
    return {
      banner: [
        /*'https://oss.chlpartner.com/distribution/gold/images/index/swiper1.png',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'*/
      ],
      activeNav: '1',
      articleList: [],
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
    };
  },
  components: {
    noData
  },
  onShow() {
    this.getData();
  },
  methods: {
    ...mapMutations(["update"]),

    getData() {
      this.getPoster()
      this.getCategory()
      
    },

    // 获取轮播图
    getPoster() {
      post(`/commPoster/getPoster?funcPage=MAIN&sysCode=CUSTOMER&userId=${this.globalData.shopId}`).then(res => {
        if (res.success) {
          this.banner = res.result
        }
      })
    },

    // 点击轮播图
    onSwiper(item) {
      wx.navigateTo({
        url: `/pages/articleDetail/main?id=${item.articleId}`
      })
    },

    // 获取类别
    getCategory() {
      post(`/category/getCategory?shopId=${this.globalData.shopId}&categoryType=ARTICLE`).then(res => {
        if (res.success) {
          this.navData = res.result
          if (res.result && res.result.length) {
            this.activeNav = res.result[0].categoryId
            this.getAdviceList(this.activeNav)
          }
        }
      })
    },

    getAdviceList(categoryId) {
      post(`/article/getAdviceList?shopId=${this.globalData.shopId}&categoryId=${categoryId}`).then(res => {
        if (res.success) {
          this.articleList = res.result || []
        }
      })
    },

    // 切换类别
    changeNav(item) {
      this.activeNav = item.categoryId
      this.getAdviceList(item.categoryId)
    },

    viewDetail(id) {
      wx.navigateTo({
        url: `/pages/articleDetail/main?id=${id}`
      })
    },

  },
  created() {
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
