<template>
  <div class="page">
    <div class="weui-cell" >
      <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
        <image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg" style="width: 50px; height: 50px; display: block"/>
        <!-- <div class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">8</div> -->
      </div>
      <div class="weui-cell__bd" style="position: relative;">
        <div>张无忌</div>
        <div style="font-size: 13px;color: #888888;">店长</div>
        <span class="score-num">60分</span>
      </div>
    </div>


    <div class="weui-cell">
      <div class="weui-cell__bd" style="position: relative;">
        <div>日常打扫卫生</div>
        <div style="font-size: 13px;color: #888888;">2019-10-12 09:00:00</div>
        <span class="score-num score-snum">+10分</span>
      </div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd" style="position: relative;">
        <div>日常打扫卫生</div>
        <div style="font-size: 13px;color: #888888;">2019-10-12 09:00:00</div>
        <span class="score-num score-snum">+10分</span>
      </div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd" style="position: relative;">
        <div>日常打扫卫生</div>
        <div style="font-size: 13px;color: #888888;">2019-10-12 09:00:00</div>
        <span class="score-num score-snum">+10分</span>
      </div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd" style="position: relative;">
        <div>日常打扫卫生</div>
        <div style="font-size: 13px;color: #888888;">2019-10-12 09:00:00</div>
        <span class="score-num score-snum">+10分</span>
      </div>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      // role: '',

    };
  },

  mounted() {
    this.id = this.$root.$mp.query.id;
    console.info(this.id)
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  methods: {


    // async getData() {
    //   const data = await get("/index/index");
    //   this.banner = data.banner;
    //   this.channel = data.channel;
    //   this.brandList = data.brandList;
    //   this.newGoods = data.newGoods;
    //   this.hotGoods = data.hotGoods;
    //   this.topicList = data.topicList;
    //   this.newCategoryList = data.newCategoryList;
    // },
    // goodsDetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/goods/main?id=" + id
    //   });
    // }
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
