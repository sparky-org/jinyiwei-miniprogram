<template>
  <div class="staff_sign">

    <div class="map" v-if="latitude && longitude">
      <map id="map" :markers="markers" :longitude="longitude" :latitude="latitude" scale="14" show-location style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"></map>
    </div>

    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">时间</div>
        <div class="weui-form-preview__value_in-hd">{{currentTime}}</div>
      </div>
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
      <button class="weui-btn" :disabled="!isIn" type="primary" @click="handleArrive">签到</button>
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
  },
  computed: {
    // ...mapState(["cityName"])
  },
  async mounted() {
    wx.getLocation({
      type: 'gcj02',
      success: async (res) => {
        console.log("当前坐标信息：", res)
        this.longitude = res.longitude
        this.latitude = res.latitude
        console.info(this.longitude,this.latitude)
        this.markers[0].longitude = res.longitude
        this.markers[0].latitude = res.latitude

        const data = await post(`/employ/getBaseLocation?shopId=${this.$store.state.userInfo.shopId}`);
        if(data.success){
          console.info(data.result)
          this.latitude = data.result.latitude
          this.longitude = data.result.longitude
          this.radius = data.result.radius
          let D = new Date(data.result.currentTime);
          let S = D.getTime();
          setInterval(() =>{
            S += 1000
            this.currentTime = msToDate(S)
          }, 1000)

          var distance = this.distance(res.latitude, res.longitude, this.latitude, this.longitude) * 1000;
          console.log("当前位置距离打卡位置：", distance, "米")
          if(distance <= this.radius){
            this.isIn = true
          }else{
            this.isIn = false
          }

        }
      }
    })

    // this.getData();
  },
  data() {
    return {
      radius: 1000000000,
      currentTime: null,
      isIn: false,
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
    async handleArrive(){
      const data = await post(`/employ/sign?employId=${this.$store.state.userInfo.employId}`);
      console.info(123,data)
      if(data.success){
        wx.showToast({
          title: '打卡成功',
          icon: 'success',
          duration: 2000,
          success(){

          }
        })
      }
    },
    // bindDateChange(e) {
    //   console.log('选中的日期为：' + e.mp.detail.value);
    //   this.date = e.mp.detail.value
    // },
    // ...mapMutations(["update"]),

    async getData() {
      // const data = await get("/index/index");
      // this.banner = data.banner;
      // this.channel = data.channel;
      // this.brandList = data.brandList;
      // this.newGoods = data.newGoods;
      // this.hotGoods = data.hotGoods;
      // this.topicList = data.topicList;
      // this.newCategoryList = data.newCategoryList;
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
