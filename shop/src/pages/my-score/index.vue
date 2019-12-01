<template>
<div class="page">
  <div style="position: fixed; top: 0; left: 0; width: 100%;">
    <div class="weui-flex tab-wrapper" >
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==1}" @click="handelTabClick(1,'DAY')">当日<em></em></div>
      </div>
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==2}" @click="handelTabClick(2,'MONTH')">当月<em></em></div>
      </div>
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==3}" @click="handelTabClick(3,'QUARTER')">当季<em></em></div>
      </div>
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==4}" @click="handelTabClick(4,'YEAR')">当年<em></em></div>
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
      <div class="weui-flex" style="background: #fcfcfc;">
        <div class="weui-flex__item">排名</div>
        <div class="weui-flex__item">姓名</div>
        <div class="weui-flex__item">加分</div>
        <div class="weui-flex__item">扣分</div>
        <div class="weui-flex__item">总分</div>
      </div>
    </div>
  </div>

  <div style="padding-top: 81px;">

    <div class="content weui-flex-wrapper">
      <div class="weui-flex list" @click="handleDetail(1)">
        <div class="weui-flex__item">1</div>
        <div class="weui-flex__item">邹志辉</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">0</div>
        <div class="weui-flex__item">100</div>
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
        <div class="weui-flex__item">李德华</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">10</div>
        <div class="weui-flex__item">90</div>
      </div>

      <div class="weui-flex list" @click="handleDetail(3)">
        <div class="weui-flex__item">3</div>
        <div class="weui-flex__item">李本山</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">20</div>
        <div class="weui-flex__item">80</div>
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
        <div class="weui-flex__item">李德华</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">10</div>
        <div class="weui-flex__item">90</div>
      </div>

      <div class="weui-flex list" @click="handleDetail(3)">
        <div class="weui-flex__item">3</div>
        <div class="weui-flex__item">李本山</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">20</div>
        <div class="weui-flex__item">80</div>
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
        <div class="weui-flex__item">李德华</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">10</div>
        <div class="weui-flex__item">90</div>
      </div>

      <div class="weui-flex list" @click="handleDetail(3)">
        <div class="weui-flex__item">3</div>
        <div class="weui-flex__item">李本山</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">20</div>
        <div class="weui-flex__item">80</div>
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
        <div class="weui-flex__item">李德华</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">10</div>
        <div class="weui-flex__item">90</div>
      </div>

      <div class="weui-flex list" @click="handleDetail(3)">
        <div class="weui-flex__item">3</div>
        <div class="weui-flex__item">李本山</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">20</div>
        <div class="weui-flex__item">80</div>
      </div>

      <div class="weui-flex list" @click="handleDetail(2)">
        <div class="weui-flex__item">2</div>
        <div class="weui-flex__item">李德华</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">10</div>
        <div class="weui-flex__item">90</div>
      </div>

      <div class="weui-flex list" @click="handleDetail(3)">
        <div class="weui-flex__item">3</div>
        <div class="weui-flex__item">李本山</div>
        <div class="weui-flex__item">80</div>
        <div class="weui-flex__item">20</div>
        <div class="weui-flex__item">80</div>
      </div>


    </div>
  </div>
</div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";

let enumTaskState = ['任务状态','进行中','审核中','已奖励'];
export default {
  onShow() {
    this.getData()
  },
  components: {

  },
  data() {
    return {
      list: [],
      // role: '',
      type: 'DEFINE',
      index: -1,
      title: enumTaskState[0],
      startDate: '',
      endDate: '',

      pageSize: 10,
      currentPage: 1,
      totalCount: 1000
    };
  },

  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  watch: {
    startDate(){
      this.getData()
    },
    endDate(){
      this.getData()
    },
    type(){
      this.getData()
    }
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
    handleDetail(id){
      wx.navigateTo({
        url: "/pages/my-score-detail/main?id="+id
      });
    },
    handelTabClick(index, type){
      this.index = index
      this.type = type
    },

    bindStartDateChange(e) {
      this.startDate = e.mp.detail.value;
    },
    bindEndDateChange(e) {
      this.endDate = e.mp.detail.value;
    },

    // bindPickerChange(e) {
    //   this.area = this.enumArea[e.mp.detail.value];
    // },

    // bindScoreChange(e) {
    //   this.score = this.enumScore[e.mp.detail.value];
    // },

    async getData(append) {
      let params = {
        "beginDate": this.startDate,
        "currentPage": append? this.currentPage++ : 1,
        "empNo": this.$store.state.userInfo.shopEmployee.id,
        "endDate": this.endDate,
        "interval": this.type,
        "pageSize": this.pageSize,
        "shopNo": this.$store.state.userInfo.shopEmployee.shopNo
      }
      const data = await post(`/point/getPointTable`, params);
      if(data.success){
        this.totalCount = data.totalCount
        this.list = append ? this.list.concat((data.result) || []) : (data.result || [])
      }
    },
    // goodsDetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/goods/main?id=" + id
    //   });
    // }
  },
  created() {

  },

};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
