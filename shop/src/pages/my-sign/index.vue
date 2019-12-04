<template>
  <div class="staff_sign">

    <div class="map" v-if="latitude && longitude">
      <map id="map" :markers="markers" :circles="circles" :longitude="longitude" :latitude="latitude" scale="17" show-location style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"></map>
    </div>

    <div class="weui-form-preview">
      <!-- <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">时间</div>
        <div class="weui-form-preview__value_in-hd">{{currentTime}}</div>
      </div> -->
      <!-- <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">地点</div>
        <div class="weui-form-preview__value_in-hd">北京天安门王府井</div>
      </div> -->
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">当前位置</div>
        <div class="weui-form-preview__value_in-hd">
          <span v-if="isIn" style="color: #179C16;">在打卡范围内</span>
          <span v-if="!isIn" style="color: #f00;">不在打卡范围内</span>
        </div>
      </div>
    </div>

    <div class="sureBth">
      <button class="weui-btn" v-if="isIn" type="primary" @click="handleSign">签到</button>
      <button class="weui-btn" v-if="!isIn" type="primary" @click="handleSign">外勤签到</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, msToDate } from "../../utils";
let img = require('../../images/marker.png')
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
    this.render()
  },
  computed: {
    // ...mapState(["cityName"])
  },
  async mounted() {

    // let D = new Date();
    // let S = D.getTime();
    // setInterval(() =>{
    //   S += 1000
    //   this.currentTime = msToDate(S)
    // }, 1000)

    // wx.getLocation({
    //   type: 'gcj02',
    //   success: async (res) => {
    //     console.log("当前坐标信息：", res)
    //     this.longitude = res.longitude
    //     this.latitude = res.latitude
    //     console.info(this.longitude,this.latitude)
    //     this.markers[0].longitude = res.longitude
    //     this.markers[0].latitude = res.latitude

    //     const data = await post(`/agency/employ/getBaseLocation?agencyId=${this.$store.state.userInfo.agencyId}`);
    //     if(data.success){
    //       console.info(data.result)
    //       this.latitude = data.result.latitude
    //       this.longitude = data.result.longitude
    //       this.radius = data.result.radius
    //       let D = new Date(data.result.currentTime);
    //       let S = D.getTime();
    //       setInterval(() =>{
    //         S += 1000
    //         this.currentTime = msToDate(S)
    //       }, 1000)

    //       var distance = this.distance(res.latitude, res.longitude, this.latitude, this.longitude) * 1000;
    //       console.log("当前位置距离打卡位置：", distance, "米")
    //       if(distance <= this.radius){
    //         this.isIn = true
    //       }else{
    //         this.isIn = false
    //       }

    //     }
    //   }
    // })

    // this.getData();
  },
  data() {
    return {
      radius: 1000000000,
      currentTime: '',
      isIn: false,

      circles:[
        {
          latitude:'',
          longitude:'',
          radius: 0,
          id: 1,
          color: '#66cc00',
          fillColor: '#7cb5ec88',
          strokeWidth: 1
        }
      ],

      markers: [{
        iconPath: img,
        // width: 50,
        // height: 50,
        id: 0,
        latitude: '',
        longitude: '',
      }],
      latitude: '',
      longitude: ''
      // date: '2019-08-11'
    };
  },
  components: {},
  methods: {
    async handleSign() {
      const data = await post(`/vacation/clockIn?empNo=${this.$store.state.userInfo.shopEmployee.id}&longitude=${this.longitude}&latitude=${this.latitude}&isOutSide=${!this.isIn}`);
      if(data.success){
        wx.showToast({
          title: this.isIn ? '打卡成功' : '外勤打卡成功',
          icon: 'success',
          duration: 1000,
          success(){

          }
        })
      }
    },


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
      console.log("当前坐标信息：112zzhnokia12", res)
      this.longitude = res.longitude
      this.latitude = res.latitude

      this.markers[0].longitude = res.longitude
      this.markers[0].latitude = res.latitude
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


    // async handleArrive(){
    //   const data = await post(`/agency/employ/sign?employId=${this.$store.state.userInfo.id}`);
    //   console.info(123,data)
    //   if(data.success){
    //     wx.showToast({
    //       title: '打卡成功',
    //       icon: 'success',
    //       duration: 2000,
    //       success(){

    //       }
    //     })
    //   }
    // },
    // async handleOutside(){
    //   const data = await post(`/agency/employ/outSideSign?employId=${this.$store.state.userInfo.id}&address=广州市天河城`);
    //   console.info(123,data)
    //   wx.showToast({
    //     title: '外勤打卡申请已提交',
    //     icon: 'success',
    //     duration: 2000,
    //     success(){

    //     }
    //   })
    //   if(data.success){
    //     wx.showToast({
    //       title: '打卡成功',
    //       icon: 'success',
    //       duration: 2000,
    //       success(){

    //       }
    //     })
    //   }
    // },
    // bindDateChange(e) {
    //   console.log('选中的日期为：' + e.mp.detail.value);
    //   this.date = e.mp.detail.value
    // },
    // ...mapMutations(["update"]),

    async getData(date) {
      const data = await post(`/vacation/myVacation?empNo=${this.$store.state.userInfo.shopEmployee.id}&month=${date}`);
      if(data.success){
        if(data.result){
          this.data = data.result
          console.info('this.data',this.data)

          this.circles[0].longitude = this.data.longitude
          this.circles[0].latitude = this.data.latitude
          this.circles[0].radius = this.data.radiu

          var distance = this.distance(this.data.latitude, this.data.longitude, this.latitude, this.longitude) * 1000;
          console.log("当前位置距离打卡位置：", distance, "米")
          if(distance <= this.data.radiu){
            console.info('在打卡范围内')
            this.isIn = true
          }else{
            console.info('不在打卡范围内')
            this.isIn = false
          }

          // if(this.data.exceptDateList && this.data.exceptDateList.length){
          //   this.tileContent = this.data.exceptDateList.map(item => {
          //     let arr = item.split('-')
          //     return {
          //       date: arr[0] + '-' + (arr[1]<10?Number(arr[1]):arr[1]) +'-' + (arr[2]<10?Number(arr[2]):arr[2]),
          //       className: 'errorDate',
          //       content: '异常'
          //     }
          //   })
          // }
        }
      }
    },
    // goodsDetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/goods/main?id=" + id
    //   });
    // }
    /**
       * @creator 新猿意码
       * @data 2019/01/17
       * @desc 由经纬度计算两点之间的距离，la为latitude缩写，lo为longitude
       * @param la1 第一个坐标点的纬度
       * @param lo1 第一个坐标点的经度
       * @param la2 第二个坐标点的纬度
       * @param lo2 第二个坐标点的经度
       * @return (int)s   返回距离(单位千米或公里)
       * @tips 注意经度和纬度参数别传反了，一般经度为0~180、纬度为0~90
       * 具体算法不做解释，有兴趣可以了解一下球面两点之间最短距离的计算方式
       */
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
      }
  },
  created() {
    // console.log(89128921982189)
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
