<template>
  <div>
    <Calendar 
      :months="months" 
      :value="value" 
      @next="next"
      @prev="prev" 
      :events="events" 
      clean       
      @select="select"       
      ref="calendar"       
      @selectMonth="selectMonth"       
      @selectYear="selectYear"/>     
    <!-- <button @click="setToday">返回今日</button> -->
  </div> 
</template>

<script>
  import Calendar from 'mpvue-calendar'
  import 'mpvue-calendar/src/style.css'
  import {
    get,
    post,
    login,
    getStorageOpenid
  } from "../../utils";
  export default {
    components: {
      Calendar
    },
    data() {
      return {
        userInfo: wx.getStorageSync("userInfo") || {},
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        disabledarr: ['2018-6-27','2018-6-25'],
        value: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()],
        begin:[2010,1,1],
        end:[2050,1,1],
        events: {/*'2018-6-7':'今日备注', '2018-6-8':'一条很长的明日备注'*/},
        date: '2019-10-20'
      };
    },
    onShow() {
      if (login()) {
        this.getInfo()
      }
    },
    created() {
    },
    mounted() {

    },
    //下拉刷新
    onPullDownRefresh: function () {
      wx.stopPullDownRefresh()
      this.loadData()
    },
    methods: {
      selectMonth(month,year){       
        console.log(year,month)     
      },     
      prev(month){      
        console.log(month)     
      },     
      next(month){       
        console.log(month)     
      },     
      selectYear(year){       
        console.log(year)     
      },     
      setToday(val,val1,val2) {       
        this.$refs.calendar.setToday();     
      },     
      select(val, val2) {
        this.data = val2.date
        this.getInfo()
        console.log(val, val2)
      },
      getInfo() {
        post(`/appointment/getAppointments?customerId=${this.userInfo.customerId}&shopId=${this.globalData.shopId}&date=${this.date}`).then(res => {
          if (res.success) {

          }
        })
      }
    },
    computed: {

    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";
</style>
