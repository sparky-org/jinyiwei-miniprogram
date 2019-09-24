<template>
  <div class="publish_task">

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
              <div class="weui-form-preview__label">任务名称</div>
              <div class="weui-form-preview__value_in-hd">签到任务</div>
            </div>
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">面向对象</div>
              <div class="weui-form-preview__value_in-hd">全体</div>
            </div>
            <div class="weui-form-preview__bd">
              <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">状态</div>
                <div class="weui-form-preview__value">未发布</div>
              </div>
            </div>
            <div class="weui-form-preview__ft">
              <!-- <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">驳回</div> -->
              <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">发布</div>
            </div>
          </div>

          <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">任务名称</div>
              <div class="weui-form-preview__value_in-hd">签到任务</div>
            </div>
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">面向对象</div>
              <div class="weui-form-preview__value_in-hd">全体</div>
            </div>
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">状态</div>
              <div class="weui-form-preview__value_in-hd">进行中</div>
            </div>
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">完成</div>
              <div class="weui-form-preview__value_in-hd">2人</div>
            </div>
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">未完成</div>
              <div class="weui-form-preview__value_in-hd">10人</div>
            </div>
          </div>




        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 1">选项二的内容</div>
        <div class="weui-tab__content" :hidden="activeIndex != 2">选项三的内容</div>
      </div>
    </div>

    <!-- <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">发布的任务1</div>
        <div class="weui-form-preview__value_in-hd">&#12288;</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">完成奖励</div>
          <div class="weui-form-preview__value">100积分</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">对象</div>
          <div class="weui-form-preview__value">全体员工</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">开始时间</div>
          <div class="weui-form-preview__value">2019-09-10</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">结束时间</div>
          <div class="weui-form-preview__value">2019-09-11</div>
        </div>
      </div>
    </div> -->



    <!-- <div class="sureBth">
      <button class="weui-btn" type="primary" @click="handleCreate">创建新任务</button>
    </div> -->
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
    ...mapState(["cityName"]),
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
    }
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      banner: [],
      tabs: ['未发布', '进行中', '已结束'],
      activeIndex: 0
    };
  },
  components: {},

  methods: {
    tabClick(e) {
      console.log(e);
      this.activeIndex = Number(e.currentTarget.id);
    },
    handleCreate(){
      wx.navigateTo({
        url: '/pages/adminPublishTaskCreate/main'
      })
    },
    ...mapMutations(["update"]),
    async getData() {
      const data = await get("/index/index");
      this.banner = data.banner;
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>
