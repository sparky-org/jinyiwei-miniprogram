<template>
  <div class="login">
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label">手机号</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入手机号" />
        </div>
        <div class="weui-cell__ft">
          <div class="weui-vcode-btn">获取验证码</div>
        </div>
      </div>

      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label">验证码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入验证码" />
        </div>
        <!-- <div class="weui-cell__ft">
          <image class="weui-vcode-img" src="/static/images/vcode.jpg" style="width: 108px" />
        </div> -->
      </div>
    </div>
    <div style="padding: 50rpx 20rpx;">
      <button class="weui-btn" type="primary">登 录</button>
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
