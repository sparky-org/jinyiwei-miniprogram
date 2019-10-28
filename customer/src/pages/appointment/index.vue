<template>
  <div class="appointment-container">
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
    <ul class="info-list">
      <li v-for="(item, index) in infoList" :key="index">
        <span class="time">{{item.time}}</span> 
        <span>{{item.title}}</span>
      </li>
    </ul>
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
        date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        infoList: [],
        month: new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
      };
    },
    onShow() {
      if (login()) {
        this.getInfo()
        this.getInfoList()
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
        this.date = val2.date
        this.getInfo(val2.date)
      },
      getInfoList(month) {
        post(`/customer/getAppointmentDay?customerId=${this.userInfo.customerId}&shopId=${this.globalData.shopId}&month=${month || this.month}`).then(res => {
          if (res.success) {
            if (res.result && res.result.length) {
              this.events = res.result.reduce((obj, cur) => {
                obj[cur] = '有预约标记'
                return obj
              }, {})
            }
          }
        })
      },
      getInfo(date) {
        post(`/appointment/getAppointments?customerId=${this.userInfo.customerId}&shopId=${this.globalData.shopId}&date=${date || this.date}`).then(res => {
          if (res.success) {
            this.infoList = res.result
          }
        })
      }
    },
    computed: {

    }
  };

</script>
<style lang='scss'>
  @import "./style";
</style>
