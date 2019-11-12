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
    <button @click="setToday">返回今日</button>
    <button @click="dateInfo">日期信息</button>
    <button @click="renderer">重新渲染年月日期</button>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleAdd">确 定</button>
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
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      disabledArray: ['2018-6-27','2018-6-25'],
      value: [2018,6,7],
      begin:[2016,1,1],
      end:[2020,1,1],
      events: {'2018-6-7':'今日备注', '2018-6-8':'一条很长的明日备注'},
      almanacs: {'9-3': '抗战胜利日', '11-17': '学生日'},
      tileContent: [
          {date: '2018-9-22', className: 'holiday ', content: '休'},
          {date: '2018-9-23', className: 'holiday ', content: '休'}
      ],
    };
  },

  mounted() {
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
    }

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
