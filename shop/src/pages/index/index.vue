<template>
  <div class="index">

    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in posters" :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.picUrl" class="slide-image" />
          </swiper-item>
        </block>
       <!-- <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="https://www.zjliren520.com/jyw-resource/18/50/18509052e68889168422e7f387e654f9" class="slide-image" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="https://www.zjliren520.com/jyw-resource/c6/6f/c66f8ec914539d73c5eb277bd4f8d244" class="slide-image" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="https://www.zjliren520.com/jyw-resource/49/41/49415a3a3a17d035b824e3065384196c" class="slide-image" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="https://www.zjliren520.com/jyw-resource/fc/04/fc04606a2b0fc629b85ee67f62f68058" class="slide-image" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="https://www.zjliren520.com/jyw-resource/d3/1c/d31cab8413663bfdd16db8e312213e4c" class="slide-image" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="https://www.zjliren520.com/jyw-resource/6b/e9/6be953c24858a3c2d787d57e6b77be1f" class="slide-image" />
        </swiper-item> -->
      </swiper>
    </div>

    <!--跑马灯 Linyufan.com-->
    <!-- <view class='horizontal happnews'>
      <view class='item happy_tui'>
        <swiper vertical :autoplay="autoplay" :interval="interval" :duration="duration" circular>
          <block v-for="(item, index) in news" :key="index">
            <swiper-item>
              <view class='show-text-1 '>
                <text class='tui_text'>公告</text>
                <text class='tui_item'>{{item}}</text>
              </view>
            </swiper-item>
          </block>
        </swiper>
      </view> -->

      <!-- <view class='more'>
        <text>更多</text>
      </view> -->
    <!-- </view> -->
    <!--跑马灯-->
    <!-- 跑马灯效果 -->




    <div class="weui-cells__title">营业动态</div>
    <div class="weui-cells weui-cells_after-title" v-if="todayBusiness">
      <navigator url="/pages/my-appointment/main?date=2019-11-15" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="padding: 0;">
        <div class="weui-cell" style="width: 100%;">
          <div class="weui-cell__bd">今日预约客户</div>
          <div class="weui-cell__ft" style="float: right;">{{todayBusiness.appointmentCustomerNum}}人</div>
        </div>
      </navigator>
      <navigator url="/pages/my-application/main?applyType=SALES_PERF&date=2019-11-15" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="padding: 0;">
        <div class="weui-cell" style="width: 100%;">
          <div class="weui-cell__bd">今日业绩</div>
          <div class="weui-cell__ft" style="float: right;">{{todayBusiness.salesPerformanceNum}}元</div>
        </div>
      </navigator>
      <navigator url="/pages/my-application/main?applyType=SERVICE_ITEM&date=2019-11-15" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="padding: 0;">
        <div class="weui-cell" style="width: 100%;">
          <div class="weui-cell__bd">今日项目数量</div>
          <div class="weui-cell__ft" style="float: right;">{{todayBusiness.serviceItemRecordNum}}个</div>
        </div>
      </navigator>
      <navigator url="/pages/my-application/main?applyType=VACATION&date=2019-11-15" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="padding: 0;">
        <div class="weui-cell" style="width: 100%;">
          <div class="weui-cell__bd">今日休息员工</div>
          <div class="weui-cell__ft" style="float: right;">{{todayBusiness.restEmployeeNum}}人</div>
        </div>
      </navigator>
    </div>


    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">今日积分排名</div>
      <div class="weui-panel__bd" v-if="todayBusiness">
        <div class="weui-flex">
          <div class="weui-flex__item">
            <div class="placeholder">
              <dl class="ph-dl">
                <dt>{{todayBusiness.yourRank}}</dt>
                <dd>排名</dd>
              </dl>
            </div>
          </div>
          <div class="weui-flex__item">
            <div class="placeholder">
              <dl class="ph-dl">
                <dt>{{todayBusiness.obtainPoint}}</dt>
                <dd>今日积分</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-panel__ft" v-if="todayBusiness">
        <div class="weui-cell weui-cell_access weui-cell_link" @click="handleScore">
          <div class="weui-cell__bd" style="color: #10AEFF;">{{todayBusiness.championName}}夺得今日排行榜冠军</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
    </div>



    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">积分动态</div>
      <div class="weui-panel__bd">
        <template v-if="list.length">
          <div v-for="(item, index) in list" :key="index" style="padding-top: 20rpx; padding-bottom: 20rpx;" url="/pages/task/main" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
            <!-- <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" :src="icon60" />
            </div> -->
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title">{{item.empName}} <span class="score-num">{{item.point}}分</span></div>
              <!-- <div class="weui-media-box__desc">
                招聘任务完成奖励
              </div> -->
            </div>
          </div>
          <div style="padding-bottom: 30rpx; margin-top:-20rpx;" class="no-more" v-if="list.length >= totalCount">没有更多了</div>
        </template>
        <no-data v-else></no-data>

      </div>
      <div class="weui-panel__ft">
        <div class="weui-cell weui-cell_access weui-cell_link" @click="handleScore">
          <div class="weui-cell__bd">查看更多</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
    </div>




   <!-- <div v-if="!data.goodsItems">
      <div class="page__bd" style="padding-top: 50rpx; text-align: center;">
        <div class="icon-box">
          <icon type="info" size="50"></icon>
          <div class="icon-box__ctn">
            <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 14px;">暂无上架商品</div>
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, queryParams } from "../../utils";
import noData from '@/components/no-data'
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {

    // 判断是否登录
    let userInfo = wx.getStorageSync("userInfo")
    if(!userInfo){
      wx.reLaunch({
        url: '/pages/login/main'
      })
      return
    }else{
      wx.setStorageSync("userInfo", userInfo);
      this.$store.commit('setUserInfo', userInfo)
    }







    // wx.navigateTo({
    //   url: "/pages/my-score/main"
    // });

    // this.$store.commit('setUserInfo',userInfo)
    // if( userInfo.role == "EMPLOY"){
    //   wx.reLaunch({
    //     url: '/pages/staffIndex/main'
    //   })
    // }
    // if( userInfo.role == "SADMIN"){
    //   wx.switchTab({
    //     url: '/pages/adminIndex/main'
    //   })
    // }
    // if( userInfo.role == "ADMIN"){
    //   wx.switchTab({
    //     url: '/pages/adminIndex/main'
    //   })
    // }
    // wx.redirectTo

    this.getBanner()
    this.getInfo()
    this.getData()
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
    this.getBanner()
    this.getInfo()
    this.getData()
  },

  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {
    // this.getData()
  },
  data() {
    return {


      text: '为了迎接双十一，凡11月1号到11月11号进店新用户预存1万为了迎接双十一，凡11月1号到11月11号进店新用户预存1万',
      marqueePace: 1,//滚动速度
      marqueeDistance: 0,//初始滚动距离
      size: 14,
      orientation: 'left',//滚动方向
      intervals: 20, // 时间间隔—




      todayBusiness: null,
      posters:[],
      // userInfo: null,
      data:null,
      brandList: [
        // {url:'https://www.zjliren520.com/jyw-resource/18/50/18509052e68889168422e7f387e654f9'},
        // {url:'https://www.zjliren520.com/jyw-resource/c6/6f/c66f8ec914539d73c5eb277bd4f8d244'},
        // {url:'https://www.zjliren520.com/jyw-resource/49/41/49415a3a3a17d035b824e3065384196c'},
        // {url:'https://www.zjliren520.com/jyw-resource/fc/04/fc04606a2b0fc629b85ee67f62f68058'},
        // {url:'https://www.zjliren520.com/jyw-resource/d3/1c/d31cab8413663bfdd16db8e312213e4c'},
        // {url:'https://www.zjliren520.com/jyw-resource/6b/e9/6be953c24858a3c2d787d57e6b77be1f'}
      ],

      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      list: [],


      news:[
        '为了迎接双十一，凡11月1号到11月11号进店新用户预存1万',
        '送1000；老客户预存1万送15000. 请大家相互转告。'
      ],
      autoplay: true,
      interval: 3000,
      duration: 1000,
      // channel: [],
      // newGoods: [],
      // hotGoods: [],
      // topicList: [],
      // newCategoryList: []
    };
  },
  components: {},
  methods: {

    runMarquee: function () {
      var that = this;
      var interval = setInterval( () => {
        //文字一直移动到末端
        if (-that.marqueeDistance < that.length) {
          this.marqueeDistance = that.marqueeDistance - that.marqueePace
        }else{
          clearInterval(interval);
          this.marqueeDistance = that.windowWidth
          that.runMarquee();
        }
      }, that.intervals);




    },

    async getData(append) {
      if(append){
        this.currentPage++
      }else{
        this.currentPage = 1
      }
      let params = {
        "currentPage": this.currentPage,
        "pageSize": this.pageSize,
        "shopNo": this.$store.state.userInfo.shopEmployee.shopNo
      }
      console.info(append,this.currentPage,'12812812')
      const data = await post(`/main/pagingQueryPointTrace?${queryParams(params)}`);
      if(data.success){
        this.totalCount = data.total
        this.list = append ? this.list.concat((data.result) || []) : (data.result || [])
      }
    },


    // ...mapMutations(["update"]),
    async getBanner(){
      // console.info(`/agency/main/getMainPage?agencyId=${this.$store.state.userInfo.agencyId}`)
      const data = post(`/poster/viewPosters?shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}&empNo=${this.$store.state.userInfo.shopEmployee.id}`).then((data)=>{
        if(data.success){
          this.posters = data.result.content.split(',')
        }
      });
    },

    async getInfo(){
      const data = post(`/main/findTodayBusiness?empNo=${this.$store.state.userInfo.shopEmployee.id}`).then((data)=>{
        if(data.success){
          this.todayBusiness = data.result
        }
      });
    },
    async getInfo(){
      const data = post(`/notice/viewNotice?empNo=${this.$store.state.userInfo.shopEmployee.id}&shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}`).then((data)=>{
        if(data.success){
          if(data.result){
            this.text = data.result.content
            // // 跑马灯
            // var length = this.text.length * this.size;//文字长度
            // var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
            // this.length = length
            // this.windowWidth = windowWidth
            // this.runMarquee();
          }
        }
      });
    },


    handleScore(){
      wx.navigateTo({
        url: "/pages/my-score/main"
      });
    }

    // async getData() {
      // const data = await get("/index/index");
      // this.banner = data.banner;
      // this.channel = data.channel;
      // this.brandList = data.brandList;
      // this.newGoods = data.newGoods;
      // this.hotGoods = data.hotGoods;
      // this.topicList = data.topicList;
      // this.newCategoryList = data.newCategoryList;
    // }
  },
  created() {
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
