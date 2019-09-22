<template>
  <div class="staff_sign">

    <div class="map">

    </div>

    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">时间</div>
        <div class="weui-form-preview__value_in-hd">2019-09-19 09:12:23</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">地点</div>
        <div class="weui-form-preview__value_in-hd">北京天安门王府井</div>
      </div>
    </div>

    <div class="sureBth">
      <button class="weui-btn" type="primary" @click="handleArrive">签到</button>
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
