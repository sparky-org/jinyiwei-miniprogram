<template>
  <div class="staff_task">

    <div class="date_wrapper">
      <picker class="weui-btn" mode="date" :value="date" start="2015-09-01" end="2027-09-10" @change="bindDateChange">
        <button type="default">{{date}}</button>
      </picker>
    </div>

    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">任务名称</div>
        <div class="weui-form-preview__value_in-hd">去NBA看比赛</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">任务内容</div>
        <div class="weui-form-preview__value_in-hd">2019-09-10到2019-09-11看球一天</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">时&#12288;&#12288;间</div>
        <div class="weui-form-preview__value_in-hd">2019-09-10 9:00</div>
      </div>
      <!-- <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">同意</div>
      </div> -->
    </div>


    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">任务名称</div>
        <div class="weui-form-preview__value_in-hd">去NBA看比赛2</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">任务内容</div>
        <div class="weui-form-preview__value_in-hd">2019-09-10到2019-09-11看球一天</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">时&#12288;&#12288;间</div>
        <div class="weui-form-preview__value_in-hd">2019-09-10 9:00</div>
      </div>
      <!-- <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">同意</div>
      </div> -->
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
    ...mapState(["cityName"])
  },
  mounted() {

    this.getData();
  },
  data() {
    return {
      date: '2019-08-11'
    };
  },
  components: {},
  methods: {
    bindDateChange(e) {
      console.log('选中的日期为：' + e.mp.detail.value);
      this.date = e.mp.detail.value
    },
    ...mapMutations(["update"]),

    async getData() {
      const data = await get("/index/index");
      // this.banner = data.banner;
      // this.channel = data.channel;
      // this.brandList = data.brandList;
      // this.newGoods = data.newGoods;
      // this.hotGoods = data.hotGoods;
      // this.topicList = data.topicList;
      // this.newCategoryList = data.newCategoryList;
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
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
