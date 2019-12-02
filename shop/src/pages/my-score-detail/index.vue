<template>
  <div class="page">

    <template v-if="list.length">
      <div class="weui-cell" v-for="(item, index) in list" :key="index">
        <!-- <div class="weui-cell__hd" style="position: relative;margin-right: 10px;"> -->
          <!-- <image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg" style="width: 50px; height: 50px; display: block"/> -->
          <!-- <div class="weui-badge" style="display:none; position: absolute;top: -.4em;right: -.4em;">8</div> -->
        <!-- </div> -->
        <div class="weui-cell__bd" style="position: relative;">
          <div>{{item.title}}</div>
          <div style="font-size: 13px;color: #888888;">{{item.time}}</div>
          <span class="score-num">{{item.point+'分'}}</span>
        </div>
      </div>
      <div style="padding-top: 30rpx; border-top: 1rpx solid #d9d9d9;" class="no-more" v-if="list.length >= totalCount">没有更多了</div>
    </template>
    <no-data v-else></no-data>

    <!-- <div class="weui-cell">
      <div class="weui-cell__bd" style="position: relative;">
        <div>日常打扫卫生</div>
        <div style="font-size: 13px;color: #888888;">2019-10-12 09:00:00</div>
        <span class="score-num score-snum">+10分</span>
      </div>
    </div> -->

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
import noData from '@/components/no-data'
// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {
    if(wx.getStorageSync('score-item-detail')){
      this.params = wx.getStorageSync('score-item-detail')
      this.getData()
      wx.removeStorageSync('score-item-detail')
    }
  },
  components: {
    noData
  },
  data() {
    return {
      // role: '',
      params: '',
      list: [],
      totalCount: 0
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

  //上拉加载
  onReachBottom() {
    if(this.list.length < this.totalCount) {
      this.getData(true)
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
    this.getData()
  },

  methods: {

    async getData(append) {
      append ? this.params.currentPage++ : 1
      const data = await post(`/point/getPointRewardDetail`, this.params);
      if(data.success){
        this.totalCount = data.total
        this.list = append ? this.list.concat((data.result) || []) : (data.result || [])
      }
    },


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
