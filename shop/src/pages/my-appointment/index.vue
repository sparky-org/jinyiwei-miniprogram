<template>
  <div class="page">

    <Calendar
      :months="months"
      :value="value"
      @next="next"
      @prev="prev"
      :events="events"
      lunar
      clean
      @select="select"
      ref="calendar"
      @selectMonth="selectMonth"
      @selectYear="selectYear"
      :arrowLeft="arrowLeft"
      :tileContent="tileContent"
      :almanacs="almanacs"
    />

    <!-- <Calendar
      :months="months"
      :value="value"
      @next="next"
      @prev="prev"
      :events="events"
      lunar
      clean
      @select="select"
      ref="calendar"
      @selectMonth="selectMonth"
      @selectYear="selectYear"
      :arrowLeft="arrowLeft"
      :tileContent="tileContent"
      :almanacs="almanacs"
    /> -->
    <!-- <button @click="setToday">返回今日</button>
    <button @click="dateInfo">日期信息</button>
    <button @click="renderer">重新渲染年月日期</button> -->

    <div style="border-top: 1rpx solid #ccc; margin-top: -20rpx;">
      <div class="weui-cells__title">我的预约</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">09:30</div>
          <div class="weui-cell__ft">张小姐第五次面部护理</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">14:30</div>
          <div class="weui-cell__ft">王小姐第三次背部按摩</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">16:00</div>
          <div class="weui-cell__ft">刘小姐第二次面部护理</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">18:30</div>
          <div class="weui-cell__ft">李小姐第一次面部护理</div>
        </div>
      </div>
    </div>




    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSign">新预约</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
// import { mapState, mapMutations } from "vuex";

import Calendar from 'mpvue-calendar'
import 'mpvue-calendar/src/style.css'

export default {
  onShow() {

  },
  components: {
    Calendar
  },
  data() {
    return {
      // months: ['一月', '二月', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      // disabledArray: ['2018-6-27','2018-6-25'],
      // value: [2018,6,7],
      // begin:[2016,1,1],
      // end:[2020,1,1],
      events: {}, //events为自定义备注，例如备注2018年6月21日为{'2018-6-21': '今日备注', '2018-6-22':'明日备注'}，在clean模式下备注为圆点，lunar农历模式下备注会替代农历优先展示
      // almanacs: {'9-3': '抗战胜利日', '11-17': '学生日'}, // 自定义节日
      tileContent: [], // tileContent参数可以为具体某日定义一个class名，还可以插入一段文本内容。如[{date: '2018-9-20', className: 'holiday', content: '休'}]可以设置2018-9-20这天的class名为holiday，并且生成一个文本内容为 休 的dom节点
    };
  },

  mounted() {
    setTimeout(()=>{
      // this.events = {
      //   '2019-11-15':'预约',
      //   '2019-11-18':'预约'
      // }
      this.tileContent.push({date: '2019-11-12', className: 'holiday', content: '预约'},{date: '2019-11-19', className: 'errorDate', content: '异常'}, {date: '2019-11-13', className: 'holiday', content: '预约'})
    },3000)
    // this.calendar.jump(2021, 10);
    // this.id = this.$root.$mp.query.id;
    // console.info(this.id)
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  methods: {

    prev(year, month, weekIndex) {
      console.log(year, month, weekIndex)
    },
    next(year, month, weekIndex) {
      console.log(year, month, weekIndex)
    },
    selectYear(year) {
      console.log(year)
    },
    selectMonth(month, year) {
      console.log(year, month)
    },
    setToday() {
      this.$refs.calendar.setToday()
    },
    dateInfo() {
      const info = this.$refs.calendar.dateInfo(2018, 8, 23)
      console.log(info);
    },
    renderer() {
      this.$refs.calendar.renderer(2018, 8); //渲染2018年8月份
    },
    select(val, val2) {
      console.log(val)
      console.log(val2)
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
    handleSign() {
      wx.navigateTo({
        url: "/pages/my-appointment-create/main"
      });
    }
  },
  created() {

  }
};
</script>

<style lang='scss'>
  @import "./style.scss";

</style>
