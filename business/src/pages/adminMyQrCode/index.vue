<template>
  <div class="my_QrCode">
    <div class="page__bd" style="padding-top: 150rpx; text-align: center;">
      <div class="icon-box">
        <icon type="info" size="93"></icon>
        <div class="icon-box__ctn">
          <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 16px;">暂无二维码，敬请期待小程序上线后更新</div>
        </div>
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
    ...mapState(["cityName"])
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      banner: [],
    };
  },
  components: {},
  methods: {
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
