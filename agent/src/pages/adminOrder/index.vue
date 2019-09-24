<template>
  <div class="order_manage">
    <div class="weui-tab">
      <div class="weui-navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
            <div class="weui-navbar__title">{{item}}</div>
          </div>
        </block>
        <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
      </div>
      <div class="weui-tab__panel">
        <div class="weui-tab__content" :hidden="activeIndex != 0">


          <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">订单时间</div>
              <div class="weui-form-preview__value_in-hd">2019-08-09</div>
            </div>
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">商户</div>
              <div class="weui-form-preview__value_in-hd">张三的美容店(张经理:13012341234)</div>
            </div>
            <div class="weui-form-preview__bd" style="padding-top: 0; padding-bottom: 0; padding-right: 20rpx;">
              <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">&#12288;</div>
                <div class="weui-form-preview__value order_send_list">
                  <div>abc护理液<span>6瓶</span></div>
                  <div>abc护理液<span>6瓶</span></div>
                  <div>abc护理液<span>6瓶</span></div>
                  <div>abc护理液<span>6瓶</span></div>
                </div>
              </div>
            </div>
            <div class="weui-form-preview__ft">
              <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">指派销售</div>
              <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">联系客服</div>
            </div>
          </div>






        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 1">选项二的内容</div>
        <div class="weui-tab__content" :hidden="activeIndex != 2">选项三的内容</div>
      </div>
    </div>


  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex === 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex === 1) {
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex === 2) {
        return 'weui-navbar__slider_2'
      }
    },
    ...mapState(["cityName"])
  },
  mounted() {

    this.getData();
  },
  data() {
    return {
      banner: [],
      tabs: ['全部', '已完成', '未完成'],
      activeIndex: 0
    };
  },
  components: {},
  methods: {
    tabClick(e) {
      console.log(e);
      this.activeIndex = Number(e.currentTarget.id);
    },
    ...mapMutations(["update"]),

    async getData() {
      const data = await get("/index/index");
      this.banner = data.banner;
      this.channel = data.channel;
      this.brandList = data.brandList;
      this.newGoods = data.newGoods;
      this.hotGoods = data.hotGoods;
      this.topicList = data.topicList;
      this.newCategoryList = data.newCategoryList;
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    },
    categoryList(id) {
      wx.navigateTo({
        url: "/pages/categorylist/main?id=" + id
      });
    },
    goodsList(info) {
      if (info == "hot") {
        wx.navigateTo({
          url: "/pages/newgoods/main?isHot=" + 1
        });
      } else {
        wx.navigateTo({
          url: "/pages/newgoods/main?isNew=" + 1
        });
      }
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
    totopic() {
      wx.navigateTo({
        url: "/pages/topic/main"
      });
    },
    tobrandList() {
      wx.navigateTo({
        url: "/pages/brandlist/main"
      });
    },
    branddetail(id) {
      wx.navigateTo({
        url: "/pages/branddetail/main?id=" + id
      });
    }
  },
  created() {
    console.log(89128921982189)
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
