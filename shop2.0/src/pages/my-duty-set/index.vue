<template>
  <div class="page">

    <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tipsMessage}}</div>

    <template v-if="!selectLocation">

      <div class="weui-form-preview" style="margin-bottom: 20rpx;">
        <div class="weui-cells weui-cells_after-title">

          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required">*</span>上班时间</div>
            </div>
            <div class="weui-cell__bd">
              <picker class="weui-btn" mode="time" :end="endTime" :value="beginTime" @change="bindBeginChange">
                <input class="weui-input" disabled="disabled" placeholder="请选择上班时间" v-model="beginTime" />
              </picker>
            </div>
          </div>


          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required">*</span>下班时间</div>
            </div>
            <div class="weui-cell__bd">
              <picker class="weui-btn" mode="time" :start="beginTime" :value="endTime" @change="bindEndChange">
                <input class="weui-input" disabled="disabled" placeholder="请选择下班时间" v-model="endTime" />
              </picker>
            </div>
          </div>

          <div class="weui-cell weui-cell_input" @click="handleSelectLocation" style="position: relative; z-index: 9;">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required">*</span>打卡地点</div>
            </div>
            <div class="weui-cell__bd" style="padding: 20rpx 0;">
              <div style="height: 2em;" v-html="locationName?locationName:'<span style=color:#777;>请选择打卡地点</span>'"></div>
              <!-- <textarea disabled="disabled" v-model="locationName" placeholder="请选择打卡地点" style="height: 3.3em; width: 100%;" /> -->
            </div>
          </div>



          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required">*</span>打卡范围</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" v-model="scopeRadio" placeholder="请输入打卡范围" />
            </div>
          </div>

          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required">*</span>按时打卡奖励</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" v-model="rewardPoint" placeholder="请按公司制度输入打卡奖励积分" />
            </div>
          </div>
        </div>

        <div class="weui-cells__title"><span class="required">*</span>选择日期</div>
        <div class="weui-cells weui-cells_after-title">
          <checkbox-group @change="checkboxChange">
            <label class="weui-cell weui-check__label" v-for="(item,index) in checkboxItems" :key="index">
              <checkbox class="weui-check" :value="item.value" :checked="item.checked" />
              <div class="weui-cell__hd weui-check__hd_in-checkbox">
                <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
                <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
              </div>
              <div class="weui-cell__bd">{{item.name}}</div>
            </label>
          </checkbox-group>
        </div>


      </div>


      <div class="operate-btn">
        <button class="weui-btn" type="primary" @click="handleSubmit">保 存</button>
      </div>

    </template>

    <div class="map" v-if="selectLocation">
      <map id="map" :markers="markers" scale="14" show-location style="position: fixed; left: 0; top: 0; bottom: 0; right: 0; width: 100%; height: 100%;"></map>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, queryParams } from "../../utils";
// let img = require('../../images/marker.png')
// import { mapState, mapMutations } from "vuex";


export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      showTopTips: false,
      tipsMessage: '',

      selectLocation: false,
      beginTime: '',
      endTime: '',
      rewardPoint: '',
      scopeRadio:'',


      // radius: 1000000000,
      // markers: [{
      //   iconPath: img,
      //   // width: 50,
      //   // height: 50,
      //   id: 0,
      //   latitude: '',
      //   longitude: '',
      // }],
      locationName: '',
      latitude: '',
      longitude: '',

      checkboxItems: [
        { name: '星期一', value: '1', checked: false },
        { name: '星期二', value: '2', checked: false },
        { name: '星期三', value: '3', checked: false },
        { name: '星期四', value: '4', checked: false },
        { name: '星期五', value: '5', checked: false },
        { name: '星期六', value: '6', checked: false },
        { name: '星期日', value: '7', checked: false },
      ],
    };
  },

  // mounted() {
    // this.calendar.jump(2021, 10);
    // this.id = this.$root.$mp.query.id;
    // console.info(this.id)
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  // },


  async mounted() {

  },
  computed: {

  },
  methods: {

    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
      var checkboxItems = this.checkboxItems;
      var values = e.mp.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems[i].value === values[j]) {
            checkboxItems[i].checked = true;
            break;
          }
        }
      }
      this.checkboxItems = checkboxItems;
    },

    async handleSubmit(){

      if(!this.locationName || !this.endTime || !this.beginTime || !this.latitude || !this.longitude || !this.rewardPoint || !this.scopeRadio){
        this.tipsMessage = '请填写完整的信息!'
        this.showTopTips = true
        setTimeout(()=>{
          this.showTopTips = false
        },1000)
        return
      }

      let workDay = this.checkboxItems.filter(item => {
        return item.checked
      }).map(item => {
        return item.name
      })

      if(!workDay.length){
        this.tipsMessage = '请选择打卡日期'
        this.showTopTips = true
        setTimeout(()=>{
          this.showTopTips = false
        },1000)
        return
      }

      let param = {
        "address": this.locationName,
        "endWorkTime": this.endTime,
        "latitude": this.latitude,
        "longitude": this.longitude,
        "operator": this.$store.state.userInfo.shopEmployee.id,
        "rewardPoint": this.rewardPoint,
        "scopeRadio": this.scopeRadio,
        "shopNo": this.$store.state.userInfo.shopEmployee.shopNo,
        "startWorkTime": this.beginTime,
        "workDay": workDay.join(',')
      }
      const data = await post("/vacation/setAttendance",param);
      if(data.success){
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1000,
          success(){

          }
        })
        setTimeout(()=>{
          wx.navigateBack({
            url: "/pages/workBench/main"
          });
        },1000)
      }
    },

    handleSelect(res){
      this.selectLocation = false
      console.info(res)
      this.locationName = res.address+res.name
      this.latitude = res.latitude
      this.longitude = res.longitude
    },


    handleSelectLocation(){
      console.info('打卡地点开始')
      this.selectLocation = true

      let _this = this

      wx.chooseLocation({
        cancel(){
          _this.selectLocation = false
        },
        success: (res) => {
          console.info(1)
          this.handleSelect(res)
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
                                  wx.chooseLocation({
                                    success: function(res) {
                                      console.info(2)
                                      _this.handleSelect(res)
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
    bindBeginChange(e) {
      console.log('选中的时间为：' + e.mp.detail.value);
      this.beginTime = e.mp.detail.value
    },
    bindEndChange(e) {
      console.log('选中的时间为：' + e.mp.detail.value);
      this.endTime = e.mp.detail.value
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
        url: "/pages/my-sign/main?"
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
