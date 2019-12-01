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


    <div class="weui-panel__bd" style="margin-top: -20rpx;" v-if="data">
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="placeholder">
            <dl class="ph-dl">
              <dt>{{data.late}}</dt>
              <dd>迟到</dd>
            </dl>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="placeholder">
            <dl class="ph-dl">
              <dt>{{data.leaveEarly}}</dt>
              <dd>早退</dd>
            </dl>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="placeholder">
            <dl class="ph-dl">
              <dt>{{data.absenteeism}}</dt>
              <dd>旷工</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>


    <div class="weui-form-preview" v-if="data">
      <!-- <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">付款金额</div>
          <div class="weui-form-preview__value_in-hd">¥2400.00</div>
        </div>
      </div> -->
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">上班时间</div>
          <div class="weui-form-preview__value" style="text-align: left;">{{data.startWorkTime}} - {{data.endWorkTime}}</div>
        </div>
        <template v-if="signInfo">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">签到</div>
            <div class="weui-form-preview__value" style="text-align: left;">{{signInfo.start}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">签退</div>
            <div class="weui-form-preview__value" style="text-align: left;">{{signInfo.end}}</div>
          </div>
        </template>
      </div>
      <!-- <div class="weui-form-preview__ft">
        <navigator url="" class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">操作</navigator>
      </div> -->
    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSign">{{isIn?'打 卡':'外勤打卡'}}</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";

import Calendar from 'mpvue-calendar'
import 'mpvue-calendar/src/style.css'

export default {
  onShow() {
    this.render()
  },
  components: {
    Calendar
  },
  data() {
    return {
      data: null,
      month: new Date().getMonth() + 1,
      signInfo: null,
      signInfo: {
        start: '09：00',
        end: '19:00'
      },

      // radius: 1000000000,
      isIn: false,


      latitude: '',
      longitude: '',



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

  mounted(){

    // setTimeout(()=>{
      // this.events = {
      //   '2019-11-15':'预约',
      //   '2019-11-18':'预约'
      // }
      // this.tileContent.push({date: '2019-12-12', className: 'holiday', content: '预约'},{date: '2019-11-19', className: 'errorDate', content: '异常'}, {date: '2019-11-13', className: 'holiday', content: '预约'})
    // },3000)




  },

  //mounted() {
    // this.calendar.jump(2021, 10);
    // this.id = this.$root.$mp.query.id;
    // console.info(this.id)
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  //},
  computed: {

  },
  methods: {
    render(){
      let _this = this
      wx.getLocation({
        success: (res) => {
          console.info(1)
          this.handleRender(res)
        },
        fail:function(){
          wx.getSetting({
            success: function (res) {
              var statu = res.authSetting;
                if (!statu['scope.userLocation']) {
                  // wx.showModal({
                  //   title: '是否授权当前位置',
                  //   content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                  //   success: function (tip) {
                        // if (tip.confirm) {
                            // wx.openSetting({
                              wx.authorize({
                                scope: 'scope.userLocation',
                                success: function (data) {
                                  // if (data.authSetting["scope.userLocation"] === true) {
                                    // wx.showToast({
                                    //   title: '授权成功',
                                    //   icon: 'success',
                                    //   duration: 1000
                                    // })
                                    //授权成功之后，再调用chooseLocation选择地方
                                    wx.getLocation({
                                      success: function(res) {
                                        console.info(2)
                                        _this.handleRender(res)
                                      }
                                    })
                                  // }
                                },
                                fail(){
                                  // wx.showToast({
                                  //   title: '授权失败',
                                  //   icon: 'success',
                                  //   duration: 1000
                                  // })
                                }
                            })
                        // }
                  //   }
                  // })
              }
            },
            fail: function (res) {
                wx.showToast({
                  title: '调用授权窗口失败',
                  icon: 'success',
                  duration: 1000
                })
            }
          })
        }
      })

    },

    handleRender(res){
      console.log("当前坐标信息：11212", res)
      this.longitude = res.longitude
      this.latitude = res.latitude
      console.info(this.longitude,this.latitude)

      let d = new Date()
      this.getData(d.getFullYear()+'-'+(d.getMonth()+1))

      // const data = await post(`/agency/employ/getBaseLocation?agencyId=${this.$store.state.userInfo.agencyId}`);
      // if(data.success){
      //   console.info(data.result)
      //   this.latitude = data.result.latitude
      //   this.longitude = data.result.longitude
      //   this.radius = data.result.radius
      //   let D = new Date(data.result.currentTime);
      //   let S = D.getTime();
      //   setInterval(() =>{
      //     S += 1000
      //     this.currentTime = msToDate(S)
      //   }, 1000)

      //   var distance = this.distance(res.latitude, res.longitude, this.latitude, this.longitude) * 1000;
      //   console.log("当前位置距离打卡位置：", distance, "米")
      //   if(distance <= this.radius){
      //     this.isIn = true
      //   }else{
      //     this.isIn = false
      //   }

      // }
    },

    distance: function (la1, lo1, la2, lo2) {
      var La1 = la1 * Math.PI / 180.0;
      var La2 = la2 * Math.PI / 180.0;
      var La3 = La1 - La2;
      var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000;
      s = s.toFixed(2);
      return s;
    },

    prev(year, month, weekIndex) {
      console.log(year, month, weekIndex)
      this.month = month
      this.getData(year +'-'+ month)
    },
    next(year, month, weekIndex) {
      console.log(year, month, weekIndex)
      this.month = month
      this.getData(year +'-'+ month)
    },
    selectYear(year) {
      console.log(year +'-'+ this.month)
      this.getData(year +'-'+ this.month)
    },
    selectMonth(month, year) {
      console.log(year, month)
      this.month = month
      this.getData(year +'-'+ month)
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
      this.getDetail(val2)
    },

    async getData(date) {
      const data = await post(`/vacation/myVacation?empNo=${this.$store.state.userInfo.shopEmployee.id}&month=${date}`);
      if(data.success){
        if(data.result){
          this.data = data.result
          console.info('this.data',this.data)
          var distance = this.distance(this.data.latitude, this.data.longitude, this.latitude, this.longitude) * 1000;
          console.log("当前位置距离打卡位置：", distance, "米")
          if(distance <= this.data.radiu){
            console.info('在打卡范围内')
            this.isIn = true
          }else{
            console.info('不在打卡范围内')
            this.isIn = false
          }

          if(this.data.exceptDateList && this.data.exceptDateList.length){
            this.tileContent = this.data.exceptDateList.map(item => {
              let arr = item.split('-')
              return {
                date: arr[0] + '-' + (arr[1]<10?Number(arr[1]):arr[1]) +'-' + (arr[2]<10?Number(arr[2]):arr[2]),
                className: 'errorDate',
                content: '异常'
              }
            })
          }
        }
      }
    },
    async getDetail(date) {
      const data = await post(`/vacation/todayVacation?empNo=${this.$store.state.userInfo.shopEmployee.id}&today=${date.date}`);
      if(data.success){
        this.signInfo = data.result
      }
    },
    async handleSign() {
      // wx.navigateTo({
      //   url: "/pages/my-sign/main?"
      // });
      const data = await post(`/vacation/clockIn?empNo=${this.$store.state.userInfo.shopEmployee.id}&longitude=${this.longitude}&latitude=${this.latitude}&isOutSide=${!this.isIn}`);
      if(data.success){
        wx.showToast({
          title: '打卡成功',
          icon: 'success',
          duration: 1000,
          success(){

          }
        })
      }
    }
  },
  created() {

  }
};
</script>

<style lang='scss'>
  @import "./style.scss";

</style>
