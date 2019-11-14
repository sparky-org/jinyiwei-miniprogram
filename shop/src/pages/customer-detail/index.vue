<template>
  <div class="customer-detail">
    <!-- <i class="iconfont iconai-user"></i> -->
    <!-- <i class="iconfont iconbodadianhua"></i> -->

    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="padding: 20rpx 0;">
        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg" style="width: 80rpx; margin-right: 20rpx; text-align: right;">
          <!-- <image class="weui-media-box__thumb" :src="icon60" /> -->
          <i class="iconfont iconai-user weui-media-box__thumb" style="color: #999; font-size: 50rpx;"></i>
        </div>
        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg" style="position: relative;">
          <div class="weui-media-box__title">李本山</div>
          <div class="weui-media-box__desc">182****8238</div>
          <i class="iconfont iconbodadianhua" style="position: absolute; right: 50rpx; top: 50%; margin-top: -56rpx; font-size: 70rpx; color: #0BB20C;"></i>
        </div>
      </div>
    </div>

    <div style="padding: 0 20rpx; background-color: #fff; box-sizing: border-box;">
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
            <!-- 选项一的内容 -->
            <div class="weui-form-preview">
              <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">客户生日</div>
                  <div class="weui-form-preview__value tl">1990-10-21</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">客户爱好</div>
                  <div class="weui-form-preview__value tl">游泳 健身 跑步 打篮球</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">备注</div>
                  <div class="weui-form-preview__value tl">很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">年度规划</div>
                  <div class="weui-form-preview__value tl">很长的名字很长很长的名字很长很长的名字</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">关联员工</div>
                  <div class="weui-form-preview__value tl">李四</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">添加日期</div>
                  <div class="weui-form-preview__value tl">2019-10-10</div>
                </div>
              </div>
            </div>


           </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
            <!-- 选项二的内容 -->
            <div class="weui-form-preview">
              <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">登记信息</div>
                  <div class="weui-form-preview__value">2017-08-21</div>
                </div>

                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">颈部护理项目</div>
                  <div class="weui-form-preview__value">2019-11-04</div>
                </div>

                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">背部按摩护理项目</div>
                  <div class="weui-form-preview__value">2019-11-07</div>
                </div>

              </div>
            </div>



          </div>
        </div>
      </div>
    </div>






    <div class="add-customer">
      <button class="weui-btn" type="primary">预约</button>
      <button class="weui-btn modify" type="default" style="margin-top: 20rpx;" @click="handleToOperate">修改</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
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
    }
  },
  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role)
    // this.getData();
  },
  data() {
    return {
      // role: ''
      tabs: ['客户信息', '跟踪信息'],
      activeIndex: 0,
    };
  },
  components: {},
  methods: {

    tabClick(e) {
      console.log(e);
      this.activeIndex = Number(e.currentTarget.id);
    },

    handleToOperate(){
      wx.navigateTo({
        url: "/pages/customer-operate/main?id=" + 1
      });
    }

    // async getData() {
    //   const data = await get("/index/index");
    //   this.banner = data.banner;
    //   this.channel = data.channel;
    //   this.brandList = data.brandList;
    //   this.newGoods = data.newGoods;
    //   this.hotGoods = data.hotGoods;
    //   this.topicList = data.topicList;
    //   this.newCategoryList = data.newCategoryList;
    // }
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
  .weui-navbar__slider_0{
    left: 0!important;
    width: 50%!important;
    transition: transform 0.3s!important;
    transform: translateX(0)!important;
  }
  .weui-navbar__slider_1{
    left: 50%!important;
    right: 0 !important;
    width: 50% !important;
    transition: transform 0.3s !important;
    transform: translateX(0) !important;
  }
  .weui-navbar__item.weui-bar__item_on .weui-navbar__title{
    color: #1aad19!important;
  }
  @import "./style.scss";
</style>
