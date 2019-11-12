<template>
  <div class="page">
    <div class="weui-flex tab-wrapper">
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==1}" @click="handelTabClick(1)">当日<em></em></div>
      </div>
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==2}" @click="handelTabClick(2)">当月<em></em></div>
      </div>
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==3}" @click="handelTabClick(3)">当季<em></em></div>
      </div>
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==4}" @click="handelTabClick(4)">当年<em></em></div>
      </div>
      <div class="item" style="border-left: 1rpx solid #fff;">
        <picker class="weui-btn" mode="date" :value="startDate" @change="bindStartDateChange">
          <div class="tab-title" style="font-size: 13px; margin: 0;">{{startDate?startDate:'开始日期'}}<ins></ins></div>
        </picker>
      </div>
      <div class="item">
        <picker class="weui-btn" mode="date" :value="endDate" @change="bindEndDateChange">
          <div class="tab-title"  style="font-size: 13px; margin: 0;">{{endDate?endDate:'结束日期'}}<ins></ins></div>
        </picker>
      </div>
    </div>

    <div class="content weui-flex-wrapper">
      <div class="weui-flex">
        <div class="weui-flex__item">排名</div>
        <div class="weui-flex__item">姓名</div>
        <div class="weui-flex__item">加分</div>
        <div class="weui-flex__item">扣分</div>
        <div class="weui-flex__item">总分</div>
      </div>

      <div class="weui-flex list" @click="handleDetail(1)">
        <div class="weui-flex__item">1</div>
        <div class="weui-flex__item">邹志辉</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">0</div>
        <div class="weui-flex__item">100</div>
      </div>

      <div class="weui-flex list" @click="handleDetail(2)">
        <div class="weui-flex__item">2</div>
        <div class="weui-flex__item">刘德华</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">10</div>
        <div class="weui-flex__item">90</div>
      </div>

      <div class="weui-flex list" @click="handleDetail(3)">
        <div class="weui-flex__item">3</div>
        <div class="weui-flex__item">赵本山</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">20</div>
        <div class="weui-flex__item">80</div>
      </div>


    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
// import { mapState, mapMutations } from "vuex";

let enumTaskState = ['任务状态','进行中','审核中','已奖励'];
export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      // role: '',
      index: 1,
      title: enumTaskState[0],
      startDate: '',
      endDate: ''
    };
  },

  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  methods: {
    handleDetail(id){
      wx.navigateTo({
        url: "/pages/my-score-detail/main?id="+id
      });
    },
    handelTabClick(index){
      this.index = index
    },

    bindStartDateChange(e) {
      this.startDate = e.mp.detail.value;
    },
    bindEndDateChange(e) {
      this.endDate = e.mp.detail.value;
    },

    bindPickerChange(e) {
      this.area = this.enumArea[e.mp.detail.value];
    },

    bindScoreChange(e) {
      this.score = this.enumScore[e.mp.detail.value];
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
